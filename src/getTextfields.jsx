import React from 'react';
import TextField from './components/TextField.jsx';
import ChannelTextfield from './components/modals/ChannelTextfield.jsx';

export const getChannelField = (field, translate, formik) => (
  <ChannelTextfield
    label={translate(`modals.${field}.input`)}
    id="channel"
    type="text"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.channel}
    touched={formik.touched.channel}
    error={formik.errors.channel || formik.errors.channelExist}
  />
);

export default (page, fields, formik, translate, isSubmitted) => fields.map((field) => {
  const autoComplete = field === 'login' ? 'username' : 'current-password';
  const userError = page === 'loginPage' ? 'userNotFound' : 'userExist';
  const type = field === 'login' ? 'text' : 'password';
  return (
    <TextField
      label={translate(`${page}.${field}`)}
      id={field}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[field]}
      touched={formik.touched[field]}
      error={formik.errors[field] || formik.errors[userError]}
      autoComplete={autoComplete}
      required
      disabled={isSubmitted}
      key={field}
    />
  );
});
