import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useApp } from '../../hooks/index.jsx';
import { channelsSchema } from '../../validationSchema.js';
import { hideModal } from '../../slices/modalSlice.js';
import ModalContainer from './ModalContainer.jsx';
import AddForm from './AddForm.jsx';
import showToast from '../../showToast.js';
import { setCurrentChannel } from '../../slices/channelSlice.js';
import setTimeoutReaction from '../../setTimeoutReaction.js';

function Add() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = React.createRef();
  const { socket } = useApp();
  const channels = useSelector((state) => state.channels.items);

  useEffect(() => {
    formRef.current.querySelector('input').focus();
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
        actions.setErrors({ channelExist: t('feedbackMessages.errors.channels.exist') });
        actions.setSubmitting(false);
        formRef.current.querySelector('input').focus();
        return;
      }
      if (!socket.connected) {
        showToast(t('feedbackMessages.errors.network'), 'error');
        actions.setSubmitting(false);
        formRef.current.querySelector('input').focus();
        return;
      }
      const timeoutID = setTimeoutReaction(actions, t);
      const data = { name: values.channel };
      socket.emit('newChannel', data, (response) => {
        if (response.status === 'ok') {
          clearTimeout(timeoutID);
          actions.setSubmitting(false);
          showToast(t('feedbackMessages.channel.added'), 'success');
          dispatch(hideModal());
          dispatch(setCurrentChannel(response.data.id));
        }
      });
    },
  });

  return (
    <ModalContainer title={t('modals.add.title')} handleClose={handleClose}>
      <AddForm ref={formRef} formik={formik} handleClose={handleClose} />
    </ModalContainer>
  );
}

export default Add;
