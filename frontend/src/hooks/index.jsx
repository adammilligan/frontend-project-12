import { useContext } from 'react';
import { AuthContext, ChatApiContext } from '../contexts';

const useAuth = () => useContext(AuthContext);
const useChatApi = () => useContext(ChatApiContext);

export { useAuth, useChatApi };
