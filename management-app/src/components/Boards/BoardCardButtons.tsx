import React from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { IBoard } from '../../store/boards/types/boards.type';

interface IBoardCardButtons {
  id: string | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
  title: string | undefined;
  description: string | undefined;
}

export const BoardCardButtons = ({
  id,
  setOpen,
  setIsEditing,
  setCurrentBoard,
  title,
  description,
}: IBoardCardButtons) => {
  const dispatch = useAppDispatch();

  const deleteHandle = async () => {
    await dispatch(deleteBoard(id));
    await dispatch(loadBoards());
  };

  const editHandle = async () => {
    setIsEditing(true);
    setOpen(true);
    setCurrentBoard((prevState) => {
      return {
        ...prevState,
        id: id,
        title: title,
        description: description,
      };
    });
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
