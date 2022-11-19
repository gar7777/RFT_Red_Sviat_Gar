import React, { Dispatch, SetStateAction } from 'react';

interface IProps {
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
  deletedColumn: string;
  handleDeleteColumn: (id: string) => void;
}

function DeleteConfirmModal({ setDeleteConfirmModal, deletedColumn, handleDeleteColumn }: IProps) {
  return (
    <>
      <p>Are you shure you want to delete column</p>
      <button onClick={() => handleDeleteColumn(deletedColumn)}>Yes</button>
      <button onClick={() => setDeleteConfirmModal(false)}>No</button>
    </>
  );
}

export default DeleteConfirmModal;
