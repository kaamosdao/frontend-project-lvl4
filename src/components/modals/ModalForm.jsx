import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { channelsSchema } from '../../validationSchema.js';
import { useSocket } from '../../hooks/index.jsx';
import { getChannelField } from '../../getTextfields.jsx';
import createModalHandleSubmit from '../../handleSubmit.js';

function FormComponent({
  handleClose, initialValue, id, event,
}, ref) {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);

  const formik = useFormik({
    initialValues: { channel: initialValue },
    validationSchema: channelsSchema,
    onSubmit: createModalHandleSubmit(event, {
      socket, channels, formRef: ref, t, dispatch, id,
    }),
  });
  return (
    <Form ref={ref} onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
      {getChannelField('rename', t, formik)}
      <Button variant="primary" type="submit">{t('modals.add.submitButton')}</Button>
      <Button variant="secondary" onClick={handleClose} className="ms-2">
        {t('modals.add.closeButton')}
      </Button>
    </Form>
  );
}

const ModalForm = React.forwardRef(FormComponent);

export default ModalForm;
