import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import { useSocket } from '../../hooks/index.jsx';
import showToast from '../../showToast.js';

function Delete() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.item);
  const formRef = useRef(null);

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!socket.connected) {
      showToast(t('feedbackMessages.errors.network'), 'error');
      return;
    }
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
    // socket.timeout(5000)
    //   .emit('removeChannel', { id }, (err) => {
    //     if (err) {
    //       Array.from(formRef.current.elements).forEach((element) => {
    //         element.removeAttribute('disabled');
    //       });
    //       showToast(t('feedbackMessages.errors.response'), 'warn');
    //     } else {
    //       dispatch(hideModal());
    //       showToast(t('feedbackMessages.channel.removed'), 'success');
    //     }
    //   });
    const timeoutID = setTimeout(() => {
      Array.from(formRef.current.elements).forEach((element) => {
        element.removeAttribute('disabled');
      });
    }, 5000);
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        Array.from(formRef.current.elements).forEach((element) => {
          element.removeAttribute('disabled');
        });
        clearTimeout(timeoutID);
        showToast(t('feedbackMessages.channel.removed'), 'success');
        dispatch(hideModal());
      }
    });
  };

  return (
    <Modal
      show
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Form ref={formRef} onSubmit={handleSubmit} className="w-100 m-auto mb-4 p-0">
        <Modal.Header className="border-0" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t('modals.delete.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="danger" type="submit">{t('modals.delete.submitButton')}</Button>
          <Button variant="secondary" className="ms-2" onClick={handleClose}>{t('modals.delete.closeButton')}</Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default Delete;
