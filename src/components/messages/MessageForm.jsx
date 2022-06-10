import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import localStorageData from '../../localStorageData.js';
import setTimeoutReaction from '../../setTimeoutReaction.js';
import showToast from '../../showToast.js';
import Input from './Input.jsx';

function MessageForm() {
  const { socket } = useSocket();
  const { t } = useTranslation();
  const formEl = useRef(null);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    formEl.current.querySelector('input').focus();
  });

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values, actions) => {
      const username = localStorageData.getUsername();
      if (!socket.connected) {
        showToast(t('feedbackMessages.errors.network'), 'error');
        actions.setSubmitting(false);
        return;
      }
      const data = {
        username,
        message: values.message,
        channelId: currentChannelId,
      };
      const timeoutID = setTimeoutReaction(actions, t);
      socket.emit('newMessage', data, (response) => {
        if (response.status === 'ok') {
          clearTimeout(timeoutID);
          actions.setSubmitting(false);
          actions.resetForm();
        }
      });
    },
  });

  return (
    <div className="form-message mt-auto px-5 py-3">
      <Form ref={formEl} onSubmit={formik.handleSubmit}>
        <Input formik={formik} />
      </Form>
    </div>
  );
}

export default MessageForm;
