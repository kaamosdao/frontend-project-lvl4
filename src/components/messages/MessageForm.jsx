import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, FormControl, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import localStorageData from '../../localStorageData.js';
import showToast from '../../showToast.js';
import makeSocketRequest from '../../makeSocketRequest.js';

function MessageForm() {
  const { socket } = useSocket();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, actions) => {
      const username = localStorageData.getUsername();
      const data = {
        username,
        message: values.message,
        channelId: currentChannelId,
      };
      try {
        await makeSocketRequest(data, socket, 'newMessage');
        actions.resetForm();
      } catch (error) {
        showToast(t(error.message), error.toastType);
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="form-message mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup className="mb-3 border-0 p-0 ps-2">
          <Form.Label className="visually-hidden" htmlFor="newMessage">
            {t('homePage.messages.inputLabel')}
          </Form.Label>
          <FormControl
            ref={inputRef}
            className="rounded-start"
            id="message"
            aria-label="Новое сообщение"
            aria-describedby="basic-addon1"
            placeholder={t('homePage.messages.inputPlaceholder')}
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.message}
            error={formik.errors.message || formik.errors.channelExist}
            disabled={formik.isSubmitting}
          />
          <Button type="submit" variant="outline-dark" id="button-addon1" className="form-button" disabled={!formik.values.message || formik.isSubmitting}>
            {t('homePage.messages.sendButton')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default MessageForm;
