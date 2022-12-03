import { Airplay } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import { useAppSelector } from '../../../store/hooks';
import styles from '../Header.module.scss';

function BtnSignUp() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <NavLink to="/signup">
        <Button variant="text" className={styles.btn}>
          <Airplay fontSize="large" className={styles.icon} />
          {i18n[lang].signUp}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnSignUp;
