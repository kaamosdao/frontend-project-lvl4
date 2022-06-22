import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hide } from '../../slices/modalSlice.js';
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
  const type = useSelector((state) => state.modal.type);
  const show = useSelector((state) => state.modal.show);

  const handleClose = () => {
    dispatch(hide());
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
          {t(title[type])}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modals[type]}
      </Modal.Body>
    </Modal>
  );
}

export default ModalContainer;
