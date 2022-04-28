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
    switch (error.response.status) {
      case 401:
        actions.setErrors({ userNotFound: 'feedbackMessages.errors.userNotFound' });
        break;
      case 409:
        actions.setErrors({ userExist: 'feedbackMessages.errors.userExist' });
        break;
      default:
        actions.setErrors({ unknown: 'feedbackMessages.errors.unknown' });
        break;
    }
  }
};
