import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { hideModal } from '../../slices/modalSlice.js';
import ChannelTextfield from './ChannelTextfield.jsx';
import { channelsSchema } from '../../validationSchema.js';
import { useSocket } from '../../hooks/index.jsx';
import showToast from '../../showToast.js';

const toggleFormElementsState = (formRef, operation) => {
  if (operation === 'enable') {
    Array.from(formRef.current.elements).forEach((element) => {
      element.removeAttribute('disabled');
    });
  } else {
    Array.from(formRef.current.elements).forEach((element) => {
      element.setAttribute('disabled', true);
    });
  }
};

const setTimeoutReaction = (formRef, translate) => {
  const timeoutID = setTimeout(() => {
    showToast(translate('feedbackMessages.errors.network'), 'error');
    toggleFormElementsState(formRef, 'enable');
    formRef.current.querySelector('input').focus();
  }, 5000);
  return timeoutID;
};

const emitEvent = (formRef, socket, timeoutID, dispatch, translate, data) => {
  socket.emit('newChannel', data, (response) => {
    if (response.status === 'ok') {
      clearTimeout(timeoutID);
      toggleFormElementsState(formRef, 'enable');
      showToast(translate('feedbackMessages.channel.added'), 'success');
      dispatch(hideModal());
    }
  });
};

const createHandleSubmit = (elements) => (values, actions) => {
  const {
    socket, channels, formRef, t: translate, dispatch,
  } = elements;
  const isAlreadyExist = channels.find((item) => item.name === values.channel);
  if (isAlreadyExist) {
    actions.setErrors({ channelExist: translate('feedbackMessages.errors.channels.exist') });
    formRef.current.querySelector('input').focus();
    return;
  }
  if (!socket.connected) {
    showToast(translate('feedbackMessages.errors.network'), 'error');
    formRef.current.querySelector('input').focus();
    return;
  }
  const data = { name: values.channel };
  toggleFormElementsState(formRef, 'disable');
  const timeoutID = setTimeoutReaction(formRef, translate);

  emitEvent(formRef, socket, timeoutID, dispatch, translate, data);
};

const getTextfield = (field, translate, formik) => (
  <ChannelTextfield
    label={translate(`modals.${field}.input`)}
    id="channel"
    type="text"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.channel}
    touched={formik.touched.channel}
    error={formik.errors.channel || formik.errors.channelExist}
  />
);

const AddForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);

  const formik = useFormik({
    initialValues: { channel: '' },
    validationSchema: channelsSchema,
    onSubmit: createHandleSubmit({
      socket, channels, formRef: ref, t, dispatch,
    }),
  });
  return (
    <Form ref={ref} onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
      {getTextfield('add', t, formik)}
      <Button variant="primary" type="submit">{t('modals.add.submitButton')}</Button>
      <Button variant="secondary" onClick={props.handleClose} className="ms-2">
        {t('modals.add.closeButton')}
      </Button>
    </Form>
  );
});

AddForm.displayName = 'AddForm';

export default AddForm;
