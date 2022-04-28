import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TextField from './TextField.jsx';
import useAppContext from '../hooks/index.jsx';
import FormWrapper from './FormWrapper.jsx';
import handleSubmit from '../handleSubmit.js';

function Login() {
  const app = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (app.loggedIn) {
    navigate('/', { replace: true });
  }
  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: handleSubmit(app, navigate, 'loginPath'),
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
