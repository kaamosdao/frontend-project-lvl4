import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import cn from 'classnames';

export default React.forwardRef(({
  label, touched, error, ...props
}, ref) => {
  const inputClass = cn('form-control', {
    'is-invalid': touched && error,
  });

  return (
    <FloatingLabel label={label} className="form-floating mb-4">
      <Form.Control autocomplete="off" ref={ref} className={inputClass} {...props} placeholder={label} />
      <div className="invalid-tooltip">
        {touched && error}
      </div>
    </FloatingLabel>
  );
});
