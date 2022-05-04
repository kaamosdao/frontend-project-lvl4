import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelSlice.js';
import { setModalInfo } from '../slices/modalSlice.js';

function Channels() {
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleCurrentChannel = (event) => {
    event.preventDefault();
    const channelName = event.target.textContent.slice(2);
    const { id } = channels.find((item) => item.name === channelName);
    dispatch(setCurrentChannel(id));
  };
  const showModal = (action, item = null) => {
    dispatch(setModalInfo({ action, item }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-2">
        <span className="channels-title">{t('homePage.channels.title')}</span>
        <Button onClick={() => showModal('adding')} variant="outline-light" className="btn-addChannel" size="sm">+</Button>
      </div>
      <Nav as="ul" className="">
        {channels.map((item) => {
          const isCurrentChannel = item.id === currentChannelId;
          const variantValue = isCurrentChannel ? 'secondary' : '';
          if (item.removable) {
            return (
              <Nav.Item as="li" key={item.id} className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Button variant={variantValue} className="text-start rounded-0 w-100" onClick={toggleCurrentChannel}>
                    {`# ${item.name}`}
                  </Button>

                  <Dropdown.Toggle split variant={variantValue} id="dropdown-split-basic">
                    <span className="visually-hidden">{t('homePage.channels.dropdownLabel')}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#" role="button" onClick={() => showModal('deleting', item)}>{t('homePage.channels.dropdownRemove')}</Dropdown.Item>
                    <Dropdown.Item href="#" role="button" onClick={() => showModal('renaming', item)}>{t('homePage.channels.dropdownRename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item onClick={toggleCurrentChannel} as="li" key={item.id} className="w-100">
              <Button variant={variantValue} className="text-start rounded-0 w-100">
                <span># </span>
                {item.name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
}

export default Channels;
