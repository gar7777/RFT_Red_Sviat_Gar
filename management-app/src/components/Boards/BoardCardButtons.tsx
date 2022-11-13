import React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, loadBoards } from '../../store/boards/thunks/loadBoards.thunk';

interface IBoardCardButtons {
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardCardButtons = ({ id, setOpen, setIsEditing }: IBoardCardButtons) => {
  const dispatch = useAppDispatch();

  const deleteHandle = async () => {
    await dispatch(deleteBoard(id));
    await dispatch(loadBoards());
  };

  const editHandle = async () => {
    setIsEditing(true);
    setOpen(true);
  };

  return (
    <CardActions>
      <Button size="small" onClick={editHandle}>
        Edit
      </Button>
      <Button size="small" onClick={deleteHandle}>
        Delete
      </Button>
    </CardActions>
  );
};
