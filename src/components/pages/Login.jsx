import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/index.jsx';
import FormWrapper from '../FormWrapper.jsx';
import { createAuthHandleSubmit } from '../../handleSubmit.js';
import getTextfields from '../../getTextfields.jsx';

function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if (auth.loggedIn) navigate('/', { replace: true });

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: createAuthHandleSubmit({
      auth, navigate, i18n, setIsSubmitted,
    }, 'loginPath'),
  });

  return (
    <FormWrapper title={t('loginPage.title')}>
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        {getTextfields('loginPage', ['login', 'password'], formik, t, isSubmitted)}
        <Button disabled={isSubmitted} type="submit" variant="primary" className="w-100 mb-3 p-3">
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
