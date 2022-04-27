import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { hideModal } from '../../slices/modalSlice.js';
import TextField from './ChannelTextfield.jsx';
import { channelsSchema } from '../../validationSchema.js';
import useAppContext from '../../hooks/index.jsx';

function Rename() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const { id } = useSelector((state) => state.modal.item);
  const inputRef = React.createRef();
  const formRef = useRef(null);
  const app = useAppContext();
  useEffect(() => {
    inputRef.current.focus();
  });
  const handleClose = () => {
    dispatch(hideModal());
  };
  const formik = useFormik({
    initialValues: { channel: '' },
    validationSchema: channelsSchema,
    onSubmit: (values, actions) => {
      const isAlreadyExist = channels.find((item) => item.name === values.channel);
      if (isAlreadyExist) {
        actions.setErrors({ channelExist: 'channel already exsist' });
        inputRef.current.focus();
        return;
      }
      Array.from(formRef.current.elements).forEach((element) => {
        element.setAttribute('disabled', true);
      });
      app.socket.timeout(5000)
        .emit('renameChannel', { id, name: values.channel }, (err) => {
          if (err) {
            inputRef.current.focus();
          } else {
            dispatch(hideModal());
          }
          Array.from(formRef.current.elements).forEach((element) => {
            element.removeAttribute('disabled');
          });
        });
    },
  });
  return (
    <Modal
      show
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Form ref={formRef} onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
        <Modal.Header className="border-0" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Rename Channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label="Channel"
            id="channel"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
            touched={formik.touched.channel}
            error={formik.errors.channel || formik.errors.channelExist}
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">Rename channel</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Rename;
