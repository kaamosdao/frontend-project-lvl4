import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const mapToggleButton = (languages, langValue, onChange) => languages.map((radio) => (
  <ToggleButton
    key={radio.name}
    id={`radio-${radio.name}`}
    type="radio"
    variant={radio.name === langValue ? 'light' : 'dark'}
    name="radio"
    value={radio.value}
    checked={langValue === radio.value}
    onChange={onChange}
    size="sm"
  >
    {radio.name}
  </ToggleButton>
));

function ButtonChangeLang() {
  const [lang, setLang] = useState('ru');
  const { i18n } = useTranslation();

  const onChange = (e) => {
    setLang(e.currentTarget.value);
    i18n.changeLanguage(e.currentTarget.value);
  };
  const languages = [
    { name: 'ru', value: 'ru' },
    { name: 'en', value: 'en' },
  ];

  return (
    <ButtonGroup className="h-50 my-auto">
      {mapToggleButton(languages, lang, onChange)}
    </ButtonGroup>
  );
}

export default ButtonChangeLang;
