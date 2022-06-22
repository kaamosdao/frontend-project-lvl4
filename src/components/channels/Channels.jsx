import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { showModal } from '../../slices/modalSlice.js';
import ChannelsItem from './ChannelsItem.jsx';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex justify-content-between mb-3 mt-5 ps-2">
        <span className="channels-title">{t('homePage.channels.title')}</span>
        <Button
          onClick={() => dispatch(showModal({ type: 'adding', id: null, name: null }))}
          variant="outline-light"
          className="btn-addChannel"
          size="sm"
        >
          +
        </Button>
      </div>
      <Nav as="ul" className="">
        {channels.map((item) => (
          <ChannelsItem key={item.id} item={item} />
        ))}
      </Nav>
    </>
  );
}

export default Channels;
