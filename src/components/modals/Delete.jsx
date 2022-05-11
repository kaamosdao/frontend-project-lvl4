import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import ModalContainer from './ModalContainer.jsx';
import DeleteForm from './DeleteForm.jsx';

function Delete() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = React.createRef();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <ModalContainer title={t('modals.delete.title')} handleClose={handleClose}>
      <DeleteForm ref={formRef} handleClose={handleClose} />
    </ModalContainer>
  );
}

export default Delete;
