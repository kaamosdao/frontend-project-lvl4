import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import TextField from './TextField.jsx';
import useAuth from '../hooks/index.jsx';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth.loggedIn) {
    return <Navigate to="/" />;
  }
  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: async (values, actions) => {
      try {
        const { data } = await axios.post('/api/v1/login', {
          username: values.login,
          password: values.password,
        });
        auth.logIn(data.username, data.token);
        navigate('/', { replace: true });
      } catch (error) {
        actions.setErrors({ userNotFound: 'user not found' });
      }
    },
  });
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="card w-50 text-center shadow-sm">
        <div className="card-body p-0">
          <h4 className="card-title my-5">Log in to account</h4>
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
                error={formik.errors.userNotFound}
                required
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
                error={formik.errors.userNotFound}
                required
              />
              <button type="submit" className="btn btn-primary w-100 mb-3 p-3">
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center align-items-center bg-light h-100 w-100 py-4 border-top">
          <p className="mb-0 me-2">New here?</p>
          <Link className="link-primary" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
