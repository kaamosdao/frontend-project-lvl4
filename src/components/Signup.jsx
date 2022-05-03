import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import schema from '../validationSchema.js';
import useAuth from '../hooks/index.jsx';
import TextField from './TextField.jsx';
import FormWrapper from './FormWrapper.jsx';
import handleSubmit from '../handleSubmit.js';

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
        <TextField
          label={t('signupPage.login')}
          id="login"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
          touched={formik.touched.login}
          error={formik.errors.login || formik.errors.userExist}
          autoComplete="username"
        />
        <TextField
          label={t('signupPage.password')}
          id="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          touched={formik.touched.password}
          error={formik.errors.password || formik.errors.userExist}
          autoComplete="new-password"
        />
        <TextField
          label={t('signupPage.confirmPassword')}
          id="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          touched={formik.touched.confirmPassword}
          error={formik.errors.confirmPassword || formik.errors.userExist}
          autoComplete="new-password"
        />
        <Button type="submit" variant="primary" className="w-100 mb-4 p-3">
          {t('signupPage.signupButton')}
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default Signup;
