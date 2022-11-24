import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteBoard, loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { IBoard } from '../../store/boards/types/boards.type';
import { l18n } from '../../features/l18n';
import ConfirmModal from '../ConfirmModal';

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
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

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
    <>
      <CardActions>
        <Button size="small" onClick={editHandle}>
          {l18n[lang].edit}
        </Button>
        <Button size="small" onClick={() => setDeleteConfirmModal(true)}>
          {l18n[lang].delete}
        </Button>
      </CardActions>
      {deleteConfirmModal && (
        <ConfirmModal
          confirm={deleteHandle}
          deny={setDeleteConfirmModal}
          isOpen={deleteConfirmModal}
          type={l18n[lang].boardS}
          title={title}
          action={l18n[lang].deleteS}
        />
      )}
    </>
  );
};
