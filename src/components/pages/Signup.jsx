import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import cn from 'classnames';
import schema from '../../validationSchema.js';
import useAuth from '../../hooks/index.jsx';
import FormWrapper from '../FormWrapper.jsx';
import serverRoutes, { clientRoutes } from '../../routes.js';
import handleError from '../../handleError.js';

const getInputClass = (inputName, errors, touched) => {
  const inputHasError = errors[inputName] || errors.userExist;
  return cn('form-control', {
    'is-invalid': touched && inputHasError,
  });
};

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

        <FloatingLabel controlId="login" label={t('signupPage.login')} className="form-floating mb-4">
          <Form.Control
            className={getInputClass('login', formik.errors, formik.touched.login)}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
            autoComplete="username"
            required
            disabled={formik.isSubmitting}
            placeholder={t('signupPage.login')}
          />
          <div className="invalid-tooltip">
            {formik.touched && t(formik.errors.login)}
          </div>
        </FloatingLabel>

        <FloatingLabel controlId="password" label={t('signupPage.password')} className="form-floating mb-4">
          <Form.Control
            className={getInputClass('password', formik.errors, formik.touched.password)}
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="current-password"
            required
            disabled={formik.isSubmitting}
            placeholder={t('signupPage.password')}
          />
          <div className="invalid-tooltip">
            {formik.touched && t(formik.errors.password)}
          </div>
        </FloatingLabel>

        <FloatingLabel controlId="confirmPassword" label={t('signupPage.confirmPassword')} className="form-floating mb-4">
          <Form.Control
            className={getInputClass('confirmPassword', formik.errors, formik.touched.confirmPassword)}
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            autoComplete="current-password"
            required
            disabled={formik.isSubmitting}
            placeholder={t('signupPage.confirmPassword')}
          />
          <div className="invalid-tooltip">
            {formik.touched && t(formik.errors.confirmPassword)}
            {formik.errors.userExist && t(formik.errors.userExist)}
          </div>
        </FloatingLabel>

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
