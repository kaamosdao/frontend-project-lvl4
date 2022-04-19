import axios from 'axios';
import routes from './routes.js';

export default (auth, navigate, path) => async (values, actions) => {
  try {
    const { data } = await axios.post(routes[path](), {
      username: values.login,
      password: values.password,
    });
    auth.logIn(data.username, data.token);
    navigate('/', { replace: true });
  } catch (error) {
    if (error.response.status === 401) {
      actions.setErrors({ userNotFound: 'user not found' });
    }
    if (error.response.status === 409) {
      actions.setErrors({ userExist: 'user already exsist' });
    } else {
      actions.setErrors({ unknown: 'unknown error' });
    }
  }
};
