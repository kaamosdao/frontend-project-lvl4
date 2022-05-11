import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import { useSocket } from '../../hooks/index.jsx';
import showToast from '../../showToast.js';

const toggleFormElementsState = (formRef, operation) => {
  if (operation === 'enable') {
    Array.from(formRef.current.elements).forEach((element) => {
      element.removeAttribute('disabled');
    });
  } else {
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
  }
};

const setTimeoutReaction = (formRef, translate) => {
  const timeoutID = setTimeout(() => {
    showToast(translate('feedbackMessages.errors.network'), 'error');
    toggleFormElementsState(formRef, 'enable');
  }, 5000);
  return timeoutID;
};

const emitEvent = (formRef, socket, timeoutID, dispatch, translate, data) => {
  socket.emit('removeChannel', data, (response) => {
    if (response.status === 'ok') {
      clearTimeout(timeoutID);
      toggleFormElementsState(formRef, 'enable');
      showToast(translate('feedbackMessages.channel.removed'), 'success');
      dispatch(hideModal());
    }
  });
};

const createHandleSubmit = (elements) => (event) => {
  event.preventDefault();
  const {
    socket, formRef, t: translate, dispatch, id,
  } = elements;

  if (!socket.connected) {
    showToast(translate('feedbackMessages.errors.network'), 'error');
    return;
  }
  const data = { id };
  toggleFormElementsState(formRef, 'disable');
  const timeoutID = setTimeoutReaction(formRef, translate);

  emitEvent(formRef, socket, timeoutID, dispatch, translate, data);
};

const DeleteForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.item);
  const handleSubmit = createHandleSubmit({
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
