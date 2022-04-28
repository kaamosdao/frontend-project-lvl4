import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import useAppContext from '../../hooks/index.jsx';

function Delete() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.item);
  const formRef = useRef(null);

  const app = useAppContext();
  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
    app.socket.timeout(5000)
      .emit('removeChannel', { id }, (err) => {
        if (err) {
          Array.from(formRef.current.elements).forEach((element) => {
            element.removeAttribute('disabled');
          });
        } else {
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
