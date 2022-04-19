import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validationSchema.js';
import TextField from './TextField.jsx';
import useAuth from '../hooks/index.jsx';
import FormWrapper from './FormWrapper.jsx';
import handleSubmit from '../handleSubmit.js';

function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: handleSubmit(auth, navigate, 'signupPath'),
  });
  if (auth.loggedIn) {
    navigate('/', { replace: true });
  }
  return (
    <FormWrapper title="Sign Up for free">
      <Form onSubmit={formik.handleSubmit} className="w-50 m-auto mb-4 p-0">
        <TextField
          label="Login"
          id="login"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
          touched={formik.touched.login}
          error={formik.errors.login || formik.errors.userExist}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          touched={formik.touched.password}
          error={formik.errors.password || formik.errors.userExist}
        />
        <TextField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          touched={formik.touched.confirmPassword}
          error={formik.errors.confirmPassword || formik.errors.userExist}
        />
        <Button type="submit" variant="primary" className="w-100 mb-4 p-3">
          Create free account
        </Button>
      </Form>
    </FormWrapper>
  );
}

export default Signup;
