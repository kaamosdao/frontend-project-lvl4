import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import TextField from './TextField.jsx';
import FormWrapper from './FormWrapper.jsx';
import handleSubmit from '../handleSubmit.js';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  if (auth.loggedIn) {
    navigate('/', { replace: true });
  }
  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: handleSubmit(auth, navigate, i18n, 'loginPath'),
  });
  return (
    <FormWrapper title={t('loginPage.title')}>
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        <TextField
          label={t('loginPage.login')}
          id="login"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
          touched={formik.touched.login}
          error={formik.errors.userNotFound}
          autoComplete="username"
          required
        />
        <TextField
          label={t('loginPage.password')}
          id="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          touched={formik.touched.password}
          error={formik.errors.userNotFound}
          autoComplete="current-password"
          required
        />
        <Button type="submit" variant="primary" className="w-100 mb-3 p-3">
          {t('loginPage.loginButton')}
        </Button>
      </Form>
      <div className="d-flex justify-content-center align-items-center bg-light h-100 w-100 py-4 border-top">
        <p className="mb-0 me-2">{t('loginPage.footer.question')}</p>
        <Link className="link-primary" to="/signup">{t('loginPage.footer.link')}</Link>
      </div>
    </FormWrapper>
  );
}

export default Login;
