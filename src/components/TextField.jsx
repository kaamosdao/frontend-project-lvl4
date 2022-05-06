import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

function TextField(props) {
  const {
    label, id, type, onChange, onBlur, value, touched, error, autoComplete, required, disabled,
  } = props;
  const { t } = useTranslation();

  const inputClass = cn('form-control', {
    'is-invalid': touched && error,
  });

  const isServerError = error === 'feedbackMessages.errors.userExist' || error === 'feedbackMessages.errors.userNotFound';
  const isPassword = id === 'password';

  return (
    <FloatingLabel controlId={id} label={label} className="form-floating mb-4">
      <Form.Control
        className={inputClass}
        {...{
          type, onChange, onBlur, value, autoComplete, required, disabled,
        }}
        placeholder={label}
      />
      <div className="invalid-tooltip">
        {!isServerError && touched && t(error)}
        {isPassword && isServerError ? t(error) : ''}
      </div>
    </FloatingLabel>
  );
}

export default TextField;
