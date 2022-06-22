import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSocket } from '../../hooks/index.jsx';
import { hide } from '../../slices/modalSlice.js';
import showToast from '../../showToast.js';
import makeSocketRequest from '../../makeSocketRequest.js';

function Delete() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.data);

  const formik = useFormik({
    initialValues: { id },
    onSubmit: async (values, actions) => {
      try {
        const data = { id: values.id };
        await makeSocketRequest(data, socket, 'removeChannel');
        showToast(t('feedbackMessages.channel.removed'), 'success');
        dispatch(hide());
      } catch (error) {
        showToast(t(error.message), error.toastType);
      }
      actions.setSubmitting(false);
    },
  });

  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
      <Button variant="danger" type="submit" disabled={formik.isSubmitting}>
        {t('modals.delete.submitButton')}
      </Button>
      <Button
        variant="secondary"
        className="ms-2"
        onClick={handleClose}
        disabled={formik.isSubmitting}
      >
        {t('modals.delete.closeButton')}
      </Button>
    </Form>
  );
}

export default Delete;
