import showToast from './showToast.js';

export default (error, actions, i18nInstance) => {
  if (error.isAxiosError && !error.response) {
    showToast(i18nInstance.t('feedbackMessages.errors.network'), 'error');
    return;
  }
  switch (error.response.status) {
    case 401:
      actions.setErrors({
        userNotFound: 'feedbackMessages.errors.userNotFound',
      });
      break;
    case 409:
      actions.setErrors({ userExist: 'feedbackMessages.errors.userExist' });
      break;
    default:
      actions.setErrors({ unknown: 'feedbackMessages.errors.unknown' });
      break;
  }
};
