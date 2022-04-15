import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import schema from '../validationSchema.js';
import TextField from './TextField.jsx';
import useAuth from '../hooks/index.jsx';

function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        const { data } = await axios.post('/api/v1/signup', {
          username: values.login,
          password: values.password,
        });
        auth.logIn(data.username, data.token);
        navigate('/', { replace: true });
      } catch (error) {
        actions.setErrors({ userExist: 'user already exsist' });
      }
    },
  });
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="card w-50 text-center shadow-sm">
        <div className="card-body p-0">
          <h4 className="card-title my-5">Sign Up for free</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-50 m-auto mb-4">
              <TextField
                label="Login"
                id="login"
                type="text"
                placeholder="Password"
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
                placeholder="Password"
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
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                touched={formik.touched.confirmPassword}
                error={formik.errors.confirmPassword || formik.errors.userExist}
              />
              <button type="submit" className="btn btn-primary w-100 mb-4 p-3">
                Create free account
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Signup;
