import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import ModalContainer from './ModalContainer.jsx';
import ModalForm from './ModalForm.jsx';

function Rename() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id, name } = useSelector((state) => state.modal.item);

  const formRef = React.createRef();
  useEffect(() => {
    formRef.current.querySelector('input').focus();
  });
  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <ModalContainer title={t('modals.rename.title')} handleClose={handleClose}>
      <ModalForm ref={formRef} event="renameChannel" initialValue={name} id={id} handleClose={handleClose} />
    </ModalContainer>
  );
}

export default Rename;
