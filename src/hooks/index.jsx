import { useContext } from 'react';
import AuthContext from './AuthContext.jsx';
import AppContext from './AppContext.jsx';

const useAuth = () => useContext(AuthContext);
export const useApp = () => useContext(AppContext);

export default useAuth;
