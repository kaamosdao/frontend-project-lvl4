import React from 'react';
import { useField, ErrorMessage } from 'formik';
import cn from 'classnames';


function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  const inputClass = cn('form-control', {
    'is-invalid': meta.touched && meta.error,
  });

  return (
    <div className="form-floating mb-4">
      <input className={inputClass} id={field.name} {...field} {...props} />
      <label htmlFor={field.name}>{label}</label>
      <ErrorMessage component="div" name={field.name} className="invalid-tooltip" />
    </div>
  );
}

export default TextField;
