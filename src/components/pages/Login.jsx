import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useAuth from '../../hooks/index.jsx';
import FormWrapper from '../FormWrapper.jsx';
import getTextfields from '../../getTextfields.jsx';
import serverRoutes, { clientRoutes } from '../../routes.js';
import handleError from '../../handleError.js';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (auth.loggedIn) {
      navigate(clientRoutes.home(), { replace: true });
    }
  });

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const { data } = await axios.post(serverRoutes.loginPath(), {
          username: values.login,
          password: values.password,
        });
        actions.setSubmitting(false);
        auth.logIn(data.username, data.token);
      } catch (error) {
        actions.setSubmitting(false);
        handleError(error, actions, i18n);
      }
    },
  });

  return (
    <FormWrapper title={t('loginPage.title')}>
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        {getTextfields('loginPage', ['login', 'password'], formik, t, formik.isSubmitting)}
        <Button disabled={formik.isSubmitting} type="submit" variant="primary" className="w-100 mb-3 p-3">
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
