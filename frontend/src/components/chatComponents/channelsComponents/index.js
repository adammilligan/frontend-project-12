import AddChannelModal from './AddChannel.jsx';
import RemoveChannelModal from './RemoveChannel.jsx';
import RenameChannelModal from './RenameChannel.jsx';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

export default (modalName) => modals[modalName];
