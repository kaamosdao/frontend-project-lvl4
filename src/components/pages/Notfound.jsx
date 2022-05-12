import React from 'react';
import { useTranslation } from 'react-i18next';

function Notfound() {
  const { t } = useTranslation();
  return (
    <div className="card text-center w-50 h-50 mx-auto mt-5 border-0">
      <div className="card-body d-flex flex-column justify-content-center p-1">
        <h1 className="card-title mb-4">{t('notfoundPage.title')}</h1>
        <img src="./assets/travolta_not_found.gif" alt="Page Not Found" />
      </div>
    </div>
  );
}

export default Notfound;
