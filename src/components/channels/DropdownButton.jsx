import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelSlice.js';
import { showModal } from '../../slices/modalSlice.js';

function DropdownButton({ variantValue, channel }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name } = channel;
  const handleSetChannel = () => {
    dispatch(setCurrentChannel(id));
  };
  const handleDeleteChannel = () => {
    dispatch(showModal({ type: 'deleting', id, name }));
  };
  const handleRenameChannel = () => {
    dispatch(showModal({ type: 'renaming', id, name }));
  };

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        variant={variantValue}
        className="text-start rounded-0 w-100"
        onClick={handleSetChannel}
      >
        {`# ${channel.name}`}
      </Button>
      <Dropdown.Toggle split variant={variantValue} id="dropdown-split-basic">
        <span className="visually-hidden">
          {t('homePage.channels.dropdownLabel')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          href="#"
          role="button"
          onClick={handleDeleteChannel}
        >
          {t('homePage.channels.dropdownRemove')}
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          role="button"
          onClick={handleRenameChannel}
        >
          {t('homePage.channels.dropdownRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
