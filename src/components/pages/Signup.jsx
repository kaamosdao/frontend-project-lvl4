import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import schema from '../../validationSchema.js';
import useAuth from '../../hooks/index.jsx';
import TextField from '../TextField.jsx';
import FormWrapper from '../FormWrapper.jsx';
import handleSubmit from '../../handleSubmit.js';

const mapFields = (fields, formik, translate) => fields.map((field) => {
  const autoComplete = field === 'login' ? 'username' : 'new-password';
  const type = field === 'login' ? 'text' : 'password';
  return (
    <TextField
      label={translate(`signupPage.${field}`)}
      id={field}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[field]}
      touched={formik.touched[field]}
      error={formik.errors[field] || formik.errors.userExist}
      autoComplete={autoComplete}
      required
      key={field}
    />
  );
});

function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: handleSubmit(auth, navigate, i18n, 'signupPath'),
  });
  if (auth.loggedIn) {
    navigate('/', { replace: true });
  }
  return (
    <FormWrapper title={t('signupPage.title')}>
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        {mapFields(['login', 'password', 'confirmPassword'], formik, t)}
        <Button type="submit" variant="primary" className="w-100 mb-4 p-3">
          {t('signupPage.signupButton')}
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default Signup;
