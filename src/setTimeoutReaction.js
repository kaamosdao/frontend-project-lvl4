import showToast from './showToast.js';

const setTimeoutReaction = (actions, translate) => {
  const delay = 5000;
  const timeoutID = setTimeout(() => {
    actions.setSubmitting(false);
    showToast(translate('feedbackMessages.errors.response'), 'warn');
  }, delay);
  return timeoutID;
};

export default setTimeoutReaction;
