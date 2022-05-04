import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { hideModal } from '../../slices/modalSlice.js';
import TextField from './ChannelTextfield.jsx';
import { channelsSchema } from '../../validationSchema.js';
import { useSocket } from '../../hooks/index.jsx';
import showToast from '../../showToast.js';

function Rename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);
  const { id, name } = useSelector((state) => state.modal.item);
  const inputRef = React.createRef();
  const formRef = useRef(null);
  const { socket } = useSocket();
  useEffect(() => {
    inputRef.current.focus();
  });
  const handleClose = () => {
    dispatch(hideModal());
  };
  const formik = useFormik({
    initialValues: { channel: name },
    validationSchema: channelsSchema,
    onSubmit: (values, actions) => {
      const isAlreadyExist = channels.find((item) => item.name === values.channel);
      if (isAlreadyExist) {
        actions.setErrors({ channelExist: t('feedbackMessages.errors.channels.exist') });
        inputRef.current.focus();
        return;
      }
      if (!socket.connected) {
        showToast(t('feedbackMessages.errors.network'), 'error');
        inputRef.current.focus();
        return;
      }
      Array.from(formRef.current.elements).forEach((element) => {
        element.setAttribute('disabled', true);
      });
      // socket.timeout(5000)
      //   .emit('renameChannel', { id, name: values.channel }, (err) => {
      //     if (err) {
      //       Array.from(formRef.current.elements).forEach((element) => {
      //         element.removeAttribute('disabled');
      //       });
      //       showToast(t('feedbackMessages.errors.response'), 'warn');
      //     } else {
      //       dispatch(hideModal());
      //       showToast(t('feedbackMessages.channel.renamed'), 'success');
      //     }
      //   });
      const timeoutID = setTimeout(() => {
        Array.from(formRef.current.elements).forEach((element) => {
          element.removeAttribute('disabled');
        });
      }, 5000);
      socket.emit('renameChannel', { id, name: values.channel }, (response) => {
        if (response.status === 'ok') {
          Array.from(formRef.current.elements).forEach((element) => {
            element.removeAttribute('disabled');
          });
          clearTimeout(timeoutID);
          dispatch(hideModal());
          showToast(t('feedbackMessages.channel.renamed'), 'success');
        }
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
            {t('modals.rename.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label={t('modals.rename.input')}
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
          <Button variant="primary" type="submit">{t('modals.rename.submitButton')}</Button>
          <Button variant="secondary" onClick={handleClose}>{t('modals.rename.closeButton')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Rename;
