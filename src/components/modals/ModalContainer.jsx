import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import Add from './Add.jsx';
import Delete from './Delete.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: <Add />,
  deleting: <Delete />,
  renaming: <Rename />,
};

const title = {
  adding: 'modals.add.title',
  deleting: 'modals.delete.title',
  renaming: 'modals.rename.title',
};

function ModalContainer() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalAction = useSelector((state) => state.modal.action);
  const show = !!modalAction;

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t(title[modalAction])}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modals[modalAction]}
      </Modal.Body>
    </Modal>
  );
}

export default ModalContainer;
