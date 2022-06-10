import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSocket } from '../../hooks/index.jsx';
import { hideModal } from '../../slices/modalSlice.js';
import showToast from '../../showToast.js';
import setTimeoutReaction from '../../setTimeoutReaction.js';

function Delete() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.modal.item);

  const formik = useFormik({
    initialValues: { id },
    onSubmit: (values, actions) => {
      if (!socket.connected) {
        showToast(t('feedbackMessages.errors.network'), 'error');
        actions.setSubmitting(false);
        return;
      }
      const data = { id: values.id };
      const timeoutID = setTimeoutReaction(actions, t);
      socket.emit('removeChannel', data, (response) => {
        if (response.status === 'ok') {
          clearTimeout(timeoutID);
          actions.setSubmitting(false);
          showToast(t('feedbackMessages.channel.removed'), 'success');
          dispatch(hideModal());
        }
      });
    },
  });

  const handleClose = () => {
    dispatch(hideModal());
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
