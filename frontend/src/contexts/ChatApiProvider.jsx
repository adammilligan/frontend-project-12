import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { ChatApiContext } from './index.jsx';
import { actions } from '../slices';

const {
  newMessage,
  newChannel,
  removeChannel,
  renameChannel,
} = actions;

const ChatApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(newMessage(payload));
    };

    socket.on('newMessage', handleNewMessage);

    const handleNewChannel = (payload) => {
      dispatch(newChannel(payload));
    };

    socket.on('newChannel', handleNewChannel);

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload));
    };

    socket.on('removeChannel', handleRemoveChannel);

    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload));
    };

    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [socket, dispatch]);

  const chatApi = useCallback((action, data, cb = null) => {
    socket.emit(action, data, (response) => {
      if (cb) {
        cb(response.data);
      }
      if (response.status !== 'ok') {
        throw new Error('chatApiError');
      }
    });
  }, [socket]);

  return (
    <ChatApiContext.Provider value={chatApi}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
