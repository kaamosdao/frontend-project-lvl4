import * as yup from 'yup';

export const channelsSchema = yup.object().shape({
  channel: yup.string()
    .min(3, 'feedbackMessages.errors.channels.min')
    .max(20, 'feedbackMessages.errors.channels.max')
    .required('feedbackMessages.errors.channels.empty'),
});

export default yup.object().shape({
  login: yup.string()
    .min(3, 'feedbackMessages.errors.login.min')
    .max(20, 'feedbackMessages.errors.login.max')
    .required('feedbackMessages.errors.required'),
  password: yup.string()
    .min(6, 'feedbackMessages.errors.password.min')
    .required('feedbackMessages.errors.required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'feedbackMessages.errors.confirmPassword.match')
    .required('feedbackMessages.errors.required'),
});
