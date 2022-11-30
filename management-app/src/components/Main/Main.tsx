import React from 'react';
import { Outlet } from 'react-router';
import styles from './Main.module.scss';

function Main() {
  return (
    <>
      <main className={styles.Main}>
        <Outlet />
      </main>
    </>
  );
}

export default Main;
