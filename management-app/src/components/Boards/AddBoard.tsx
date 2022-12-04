import React from 'react';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IconButton from '@mui/material/IconButton';
import styles from '../Boards/Boards.module.scss';

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBoard = ({ setOpen, setIsEditing }: IProps) => {
  const addHandler = () => {
    setOpen(true);
    setIsEditing(false);
  };
  return (
    <IconButton color="primary" size="large" onClick={addHandler} className={styles.card}>
      <AddBoxRoundedIcon fontSize="large" />
    </IconButton>
  );
};
