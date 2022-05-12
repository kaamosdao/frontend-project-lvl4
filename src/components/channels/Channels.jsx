import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setModalInfo } from '../../slices/modalSlice.js';
import Channelslist from './ChannelsList.jsx';

function Channels() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showModal = (action, item = null) => {
    dispatch(setModalInfo({ action, item }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3 mt-5 ps-2">
        <span className="channels-title">{t('homePage.channels.title')}</span>
        <Button
          onClick={() => showModal('adding')}
          variant="outline-light"
          className="btn-addChannel"
          size="sm"
        >
          +
        </Button>
      </div>
      <Channelslist showModal={showModal} />
    </>
  );
}

export default Channels;
