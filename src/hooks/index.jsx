import { useContext } from 'react';
import AuthContext from './AuthContext.jsx';
import SocketContext from './SocketContext.jsx';

const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);

export default useAuth;
