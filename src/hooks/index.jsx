import { useContext } from 'react';
import Context from '../Context.jsx';

const useAuth = () => useContext(Context);

export default useAuth;
