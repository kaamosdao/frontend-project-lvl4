import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { show } from '../../slices/modalSlice.js';

function DropdownButton({ variantValue, item, toggleCurrentChannel }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button variant={variantValue} className="text-start rounded-0 w-100" onClick={toggleCurrentChannel}>
        {`# ${item.name}`}
      </Button>
      <Dropdown.Toggle split variant={variantValue} id="dropdown-split-basic">
        <span className="visually-hidden">{t('homePage.channels.dropdownLabel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" role="button" onClick={() => dispatch(show({ type: 'deleting', id: item.id, name: item.name }))}>
          {t('homePage.channels.dropdownRemove')}
        </Dropdown.Item>
        <Dropdown.Item href="#" role="button" onClick={() => dispatch(show({ type: 'renaming', id: item.id, name: item.name }))}>
          {t('homePage.channels.dropdownRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
