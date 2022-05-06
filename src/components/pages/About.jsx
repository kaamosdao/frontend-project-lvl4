import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div className="card text-center w-75 mt-5 mx-auto shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{t('aboutPage.title')}</h5>
        <p className="card-text">{t('aboutPage.body.description')}</p>
        <p className="card-text">{t('aboutPage.body.gratitude')}</p>
      </div>
    </div>
  );
}

export default About;
