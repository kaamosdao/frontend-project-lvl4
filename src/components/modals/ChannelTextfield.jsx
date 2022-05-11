import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

function ChannelTextfield(props) {
  const {
    label, id, type, onChange, onBlur, value, touched, error,
  } = props;
  const { t } = useTranslation();
  const inputClass = cn('form-control', {
    'is-invalid': touched && error,
  });

  return (
    <FloatingLabel controlId={id} label={label} className="form-floating mb-4">
      <Form.Control
        autoComplete="off"
        className={inputClass}
        {...{
          type, onChange, onBlur, value,
        }}
        placeholder={label}
      />
      <div className="invalid-tooltip">
        {touched && t(error)}
      </div>
    </FloatingLabel>
  );
}

export default ChannelTextfield;
