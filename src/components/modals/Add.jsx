import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';
import { channelsSchema } from '../../validationSchema.js';
import { hideModal } from '../../slices/modalSlice.js';
import showToast from '../../showToast.js';
import { setCurrentChannel } from '../../slices/channelSlice.js';
import makeSocketRequest from '../../makeSocketRequest.js';

function Add() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { socket } = useSocket();
  const channels = useSelector((state) => state.channels.items);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleClose = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { channel: '' },
    validationSchema: channelsSchema(channels),
    onSubmit: async (values, actions) => {
      try {
        const data = { name: values.channel };
        const { id } = await makeSocketRequest(data, socket, 'newChannel');
        showToast(t('feedbackMessages.channel.added'), 'success');
        dispatch(hideModal());
        dispatch(setCurrentChannel(id));
      } catch (error) {
        showToast(t(error.message), error.toastType);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
      <FloatingLabel
        controlId="channel"
        label={t('modals.add.input')}
        className="form-floating mb-4"
      >
        <Form.Control
          ref={inputRef}
          autoComplete="off"
          className="form-control"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
          disabled={formik.isSubmitting}
          placeholder={t('modals.add.input')}
          isInvalid={!formik.isValid}
        />
        <div className="invalid-tooltip">
          {formik.touched && t(formik.errors.channel)}
        </div>
      </FloatingLabel>
      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        {t('modals.add.submitButton')}
      </Button>
      <Button
        variant="secondary"
        onClick={handleClose}
        className="ms-2"
        disabled={formik.isSubmitting}
      >
        {t('modals.add.closeButton')}
      </Button>
    </Form>
  );
}

export default Add;
