import React from 'react';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Input({ formik }) {
  const { t } = useTranslation();
  return (
    <InputGroup className="mb-3 border-0 p-0 ps-2">
      <Form.Label className="visually-hidden" htmlFor="newMessage">
        {t('homePage.messages.inputLabel')}
      </Form.Label>
      <FormControl
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
  );
}

export default Input;
