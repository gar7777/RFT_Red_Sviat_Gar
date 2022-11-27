import React from 'react';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IconButton from '@mui/material/IconButton';

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
    <IconButton color="primary" size="large" onClick={addHandler}>
      <AddBoxRoundedIcon fontSize="large" />
    </IconButton>
  );
};
