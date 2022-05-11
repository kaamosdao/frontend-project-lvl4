import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import createModalHandleSubmit from '../../handleSubmit.js';

const DeleteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.item);
  const handleSubmit = createModalHandleSubmit('removeChannel', {
    socket, formRef: ref, t, dispatch, id,
  });
  return (
    <Form ref={ref} onSubmit={handleSubmit} className="w-100 m-auto mb-4 p-0">
      <Button variant="danger" type="submit">{t('modals.delete.submitButton')}</Button>
      <Button variant="secondary" className="ms-2" onClick={props.handleClose}>{t('modals.delete.closeButton')}</Button>
    </Form>
  );
});

DeleteForm.displayName = 'DeleteForm';

export default DeleteForm;
