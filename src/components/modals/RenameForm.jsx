import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChannelTextfield from './ChannelTextfield.jsx';

function FormComponent({ handleClose, formik }, ref) {
  const { t } = useTranslation();

  return (
    <Form
      ref={ref}
      onSubmit={formik.handleSubmit}
      className="w-100 m-auto mb-4 p-0"
    >
      <ChannelTextfield
        label={t('modals.rename.input')}
        id="channel"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.channel}
        touched={formik.touched.channel}
        error={formik.errors.channel || formik.errors.channelExist}
        disabled={formik.isSubmitting}
      />
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

const RenameForm = React.forwardRef(FormComponent);

export default RenameForm;
