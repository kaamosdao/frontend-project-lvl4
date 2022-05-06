import axios from 'axios';
import routes from './routes.js';
import showToast from './showToast.js';

const handleNetworkError = (message, i18nInstance) => {
  if (message === 'Network Error') {
    showToast(i18nInstance.t('feedbackMessages.errors.network'), 'error');
  }
};

export default (auth, navigate, i18nInstance, setIsSubmitted, path) => async (values, actions) => {
  try {
    setIsSubmitted(true);
    const { data } = await axios.post(routes[path](), {
      username: values.login,
      password: values.password,
    });
    setIsSubmitted(false);
    auth.logIn(data.username, data.token);
    navigate('/', { replace: true });
  } catch (error) {
    setIsSubmitted(false);
    handleNetworkError(error.message, i18nInstance);
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
