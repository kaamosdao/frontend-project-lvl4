import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import schema from '../../validationSchema.js';
import useAuth from '../../hooks/index.jsx';
import FormWrapper from '../FormWrapper.jsx';
import { createAuthHandleSubmit } from '../../handleSubmit.js';
import getTextfields from '../../getTextfields.jsx';

function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: createAuthHandleSubmit({
      auth, navigate, i18n, setIsSubmitted,
    }, 'signupPath'),
  });
  if (auth.loggedIn) {
    navigate('/', { replace: true });
  }
  return (
    <FormWrapper title={t('signupPage.title')}>
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        {getTextfields('signupPage', ['login', 'password', 'confirmPassword'], formik, t, isSubmitted)}
        <Button disabled={isSubmitted} type="submit" variant="primary" className="w-100 mb-4 p-3">
          {t('signupPage.signupButton')}
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default Signup;
