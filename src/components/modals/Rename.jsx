import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import ModalContainer from './ModalContainer.jsx';
import RenameForm from './RenameForm.jsx';

function Rename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = React.createRef();
  useEffect(() => {
    formRef.current.querySelector('input').focus();
  });
  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <ModalContainer title={t('modals.rename.title')} handleClose={handleClose}>
      <RenameForm ref={formRef} handleClose={handleClose} />
    </ModalContainer>
  );
}

export default Rename;
