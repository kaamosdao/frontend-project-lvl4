import * as yup from 'yup';

export const channelsSchema = yup.object().shape({
  channel: yup.string()
    .min(3, 'must be at least 3 characters')
    .max(10, 'must be less than 10 characters')
    .required('must not be empty'),
});

export default yup.object().shape({
  login: yup.string()
    .min(3, 'must be at least 3 characters')
    .required('login is required'),
  password: yup.string()
    .min(6, 'must be at least 6 characters')
    .required('password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'password must match')
    .required('confirm password is required'),
});
