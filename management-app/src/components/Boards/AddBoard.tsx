import React from 'react';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IconButton from '@mui/material/IconButton';

interface IAddBoard {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBoard = ({ setOpen }: IAddBoard) => {
  return (
    <IconButton color="primary" size="large" onClick={() => setOpen(true)}>
      <AddBoxRoundedIcon fontSize="large" />
    </IconButton>
  );
};
