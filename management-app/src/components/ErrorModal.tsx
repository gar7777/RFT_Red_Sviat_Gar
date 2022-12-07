import { Dialog } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { i18n } from '../features/i18n';
import { clearAuthError } from '../store/authorization/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface IProps {
  error: string;
  setIsErrorModalOpen: Dispatch<SetStateAction<boolean>>;
  isErrorModalOpen: boolean;
}

function ErrorModal({ error, isErrorModalOpen, setIsErrorModalOpen }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(clearAuthError());
    setIsErrorModalOpen(false);
  };

  return (
    <Dialog open={isErrorModalOpen} onClose={handleOnClose}>
      <div style={{ padding: '3rem' }}>
        <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>{i18n[lang].userNotFound}</p>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
          {i18n[lang].error}: {error}
        </p>
      </div>
    </Dialog>
  );
}

export default ErrorModal;
