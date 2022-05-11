import React from 'react';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function DropdownButton({
  variantValue, item, showModal, toggleCurrentChannel,
}) {
  const { t } = useTranslation();

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
