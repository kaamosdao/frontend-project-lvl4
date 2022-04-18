import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import cn from 'classnames';

function TextField({
  label, touched, error, ...props
}) {
  const inputClass = cn('form-control', {
    'is-invalid': touched && error,
  });

  const isServerError = error === 'user already exsist' || error === 'user not found';
  const isPassword = props.id === 'password';

  return (
    <FloatingLabel label={label} className="form-floating mb-4">
      <Form.Control className={inputClass} {...props} placeholder={label} />
      <div className="invalid-tooltip">
        {!isServerError && touched && error}
        {isPassword && isServerError ? error : ''}
      </div>
    </FloatingLabel>
  );
}

export default TextField;
