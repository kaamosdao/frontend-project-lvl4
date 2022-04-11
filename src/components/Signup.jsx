import React from 'react';
import { Formik, Form } from 'formik';
import schema from '../validationSchema.js';
import TextField from './TextField.jsx';

function Signup() {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <div className="card w-50 text-center">
        <div className="card-body">
          <h4 className="card-title mt-4 mb-4">Sign Up for free</h4>
        </div>
        <Formik
          initialValues={{ login: '', password: '', confirmPassword: '' }}
          validationSchema={schema}
        >
          {(formik) => (
            <Form>
              <div className="w-50 m-auto mb-4">
                <TextField name="login" type="text" label="Login" placeholder="login" />
                <TextField name="password" type="password" label="Password" placeholder="login" />
                <TextField name="confirmPassword" type="password" label="Confirm Password" placeholder="confirm password" />
                <button type="submit" className="btn btn-primary w-100 mb-4 p-3">
                  Create free account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  );
}

export default Signup;