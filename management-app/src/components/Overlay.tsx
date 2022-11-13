import React from 'react';
import styles from './Overlay.module.scss';

interface IProps {
  closeModal: () => void;
}

function Overlay(props: IProps) {
  return <div className={styles.overlay} onClick={props[0]}></div>;
}

export default Overlay;
