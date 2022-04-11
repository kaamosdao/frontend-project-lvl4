import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextField from './TextField.jsx';

function Login() {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="card w-50 text-center shadow-sm">
        <div className="card-body p-0">
          <h4 className="card-title my-5">Log in to account</h4>
          <Formik
            initialValues={{ login: '', password: '' }}
          >
            {() => (
              <Form>
                <div className="w-50 m-auto mb-4">
                  <TextField name="login" type="text" label="Login" placeholder="login" />
                  <TextField name="password" type="password" label="Password" placeholder="login" />
                  <button type="submit" className="btn btn-primary w-100 mb-3 p-3">
                    Log In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
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
