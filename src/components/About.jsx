import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const onClick = () => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };
  return (
    <div className="card text-center w-75 mt-5 mx-auto shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{t('aboutPage.title')}</h5>
        <p className="card-text">{t('aboutPage.body.description')}</p>
        <p className="card-text">{t('aboutPage.body.gratitude')}</p>
        <button type="button" onClick={onClick}>{i18n.language}</button>
      </div>
    </div>
  );
}

export default About;
