import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Modal,
} from 'react-bootstrap';
import { hideModal } from '../../slices/modalSlice.js';

function Rename() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };
  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rename Modal title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Rename Modal text
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Rename;
