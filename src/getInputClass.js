import cn from 'classnames';

export const getInputClass = (isValid) => cn('form-control', {
  'is-invalid': !isValid,
});

export default (inputName, errors, touched) => {
  const inputHasError = errors[inputName] || errors.userExist;
  return cn('form-control', {
    'is-invalid': touched && inputHasError,
  });
};
