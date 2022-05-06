import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelSlice.js';

function DropdownButton({ variantValue, item, showModal }) {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.items);
  const dispatch = useDispatch();
  const toggleCurrentChannel = (event) => {
    const channelName = event.target.textContent.slice(2);
    const { id } = channels.find((channel) => channel.name === channelName);
    dispatch(setCurrentChannel(id));
  };

  return (
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
  );
}

export default DropdownButton;
