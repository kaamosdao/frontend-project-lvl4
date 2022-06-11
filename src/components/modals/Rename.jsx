import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useSocket } from '../../hooks/index.jsx';
import { hideModal } from '../../slices/modalSlice.js';
import showToast from '../../showToast.js';
import { channelsSchema } from '../../validationSchema.js';
import makeSocketRequest from '../../makeSocketRequest.js';
import { getInputClass } from '../../getInputClass.js';

function Rename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { id, name } = useSelector((state) => state.modal.item);
  const channels = useSelector((state) => state.channels.items);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleClose = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: { channel: name },
    validationSchema: channelsSchema(channels),
    onSubmit: (values, actions) => {
      const data = { id, name: values.channel };
      makeSocketRequest(data, socket, 'renameChannel')
        .then(() => {
          actions.setSubmitting(false);
          showToast(t('feedbackMessages.channel.renamed'), 'success');
          dispatch(hideModal());
        })
        .catch((error) => {
          actions.setSubmitting(false);
          showToast(t(error.message), error.toastType);
        });
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="w-100 m-auto mb-4 p-0"
    >
      <FloatingLabel controlId="channel" label={t('modals.rename.input')} className="form-floating mb-4">
        <Form.Control
          ref={inputRef}
          autoComplete="off"
          className={getInputClass(formik.isValid)}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
          disabled={formik.isSubmitting}
          placeholder={t('modals.rename.input')}
          onFocus={() => inputRef.current.select()}
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

export default Rename;
