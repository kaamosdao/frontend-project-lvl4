import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import schema from '../../validationSchema.js';
import useAuth from '../../hooks/index.jsx';
import FormWrapper from '../FormWrapper.jsx';
import serverRoutes, { clientRoutes } from '../../routes.js';
import handleError from '../../handleError.js';
import TextField from '../TextField.jsx';

function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const { data } = await axios.post(serverRoutes.signupPath(), {
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
  if (auth.loggedIn) {
    navigate(clientRoutes.home(), { replace: true });
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
          required
          disabled={formik.isSubmitting}
          key="login"
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
          autoComplete="current-password"
          required
          disabled={formik.isSubmitting}
          key="password"
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
          autoComplete="current-password"
          required
          disabled={formik.isSubmitting}
          key="confirmPassword"
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
          className="w-100 mb-4 p-3"
        >
          {t('signupPage.signupButton')}
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default Signup;
