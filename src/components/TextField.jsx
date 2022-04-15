import React from 'react';
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
    <div className="form-floating mb-4">
      <input className={inputClass} {...props} />
      <label htmlFor={props.id}>{label}</label>
      <div className="invalid-tooltip">
        {!isServerError && touched && error}
        {isPassword && isServerError ? error : ''}
      </div>
    </div>
  );
}

export default TextField;
