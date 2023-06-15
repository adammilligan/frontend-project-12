import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useChatApi } from '../../../hooks';
import { actions } from '../../../slices';

const channelsValidationSchema = (channelsNames, translate) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(translate('required'))
    .min(3, translate('nameLength'))
    .max(20, translate('nameLength'))
    .notOneOf(channelsNames, translate('modals.duplicate')),
});

const AddChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const channels = useSelector((s) => s.channelsInfo.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const chatApi = useChatApi();
  const dispatch = useDispatch();

  const { setCurrentChannel } = actions;

  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const notify = () => toast.success(t('toasts.createChannel'));
  const notifyError = (text) => toast.error(t(`toasts.${text}`));

  const handleClose = (newChat) => {
    dispatch(setCurrentChannel({ id: newChat.id }));
    onHide();
    notify();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelsValidationSchema(channelsNames, t),
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      try {
        chatApi('newChannel', { name: cleanedName }, handleClose);
        formik.values.name = '';
      } catch (error) {
        notifyError(error.message);
      }
    },
  });

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={input}
              id="name"
              name="name"
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>{t('modals.channelName')}</Form.Label>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>
            <Modal.Footer>
              <Button
                variant="secondary"
                type="button"
                onClick={onHide}
              >
                {t('modals.cancelButton')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={formik.handleSubmit}
                disabled={formik.errors.name}
              >
                {t('modals.addButton')}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
