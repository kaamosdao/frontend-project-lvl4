import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import ModalContainer from './ModalContainer.jsx';
import AddForm from './AddForm.jsx';

function Add() {
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
    <ModalContainer title={t('modals.add.title')} handleClose={handleClose}>
      <AddForm ref={formRef} handleClose={handleClose} />
    </ModalContainer>
  );
}

export default Add;
