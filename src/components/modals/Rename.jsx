import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useApp } from '../../hooks/index.jsx';
import { hideModal } from '../../slices/modalSlice.js';
import RenameForm from './RenameForm.jsx';
import showToast from '../../showToast.js';
import { channelsSchema } from '../../validationSchema.js';
import setTimeoutReaction from '../../setTimeoutReaction.js';

function Rename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socket } = useApp();
  const { id, name } = useSelector((state) => state.modal.item);
  const channels = useSelector((state) => state.channels.items);
  const formRef = React.createRef();

  useEffect(() => {
    formRef.current.querySelector('input').focus();
  });

  const formik = useFormik({
    initialValues: { channel: name },
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
      const data = { id, name: values.channel };
      socket.emit('renameChannel', data, (response) => {
        if (response.status === 'ok') {
          clearTimeout(timeoutID);
          actions.setSubmitting(false);
          showToast(t('feedbackMessages.channel.renamed'), 'success');
          dispatch(hideModal());
        }
      });
    },
  });

  return (
    <RenameForm ref={formRef} formik={formik} />
  );
}

export default Rename;
