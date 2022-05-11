import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { channelsSchema } from '../../validationSchema.js';
import { useSocket } from '../../hooks/index.jsx';
import { getChannelField } from '../../getTextfields.jsx';
import createModalHandleSubmit from '../../handleSubmit.js';

const AddForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);

  const formik = useFormik({
    initialValues: { channel: '' },
    validationSchema: channelsSchema,
    onSubmit: createModalHandleSubmit('newChannel', {
      socket, channels, formRef: ref, t, dispatch,
    }),
  });
  return (
    <Form ref={ref} onSubmit={formik.handleSubmit} className="w-100 m-auto mb-4 p-0">
      {getChannelField('add', t, formik)}
      <Button variant="primary" type="submit">{t('modals.add.submitButton')}</Button>
      <Button variant="secondary" onClick={props.handleClose} className="ms-2">
        {t('modals.add.closeButton')}
      </Button>
    </Form>
  );
});

AddForm.displayName = 'AddForm';

export default AddForm;
