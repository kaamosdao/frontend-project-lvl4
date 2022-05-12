import React from 'react';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Input({ handleChange, inputValue }) {
  const { t } = useTranslation();
  return (
    <InputGroup className="mb-3 border-0 p-0 ps-2">
      <Form.Label className="visually-hidden" htmlFor="newMessage">{t('homePage.messages.inputLabel')}</Form.Label>
      <FormControl
        className="rounded-start"
        id="newMessage"
        aria-label="New message"
        aria-describedby="basic-addon1"
        placeholder={t('homePage.messages.inputPlaceholder')}
        onChange={handleChange}
        value={inputValue}
        autoFocus
      />
      <Button type="submit" variant="outline-dark" id="button-addon1" className="form-button" disabled={!inputValue}>
        {t('homePage.messages.sendButton')}
      </Button>
    </InputGroup>
  );
}

export default Input;
