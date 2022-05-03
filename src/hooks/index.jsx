import { useContext } from 'react';
import AuthContext from './AuthContext.jsx';
import SocketContext from './SocketContext.jsx';
import FilterContext from './FilterContext.jsx';

const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useFilter = () => useContext(FilterContext);

export default useAuth;
