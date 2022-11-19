import React, { Dispatch, SetStateAction } from 'react';

interface IProps {
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  handleDeleteTask: () => Promise<void>;
}

function DeleteTaskModal({ setDeleteTaskModal, handleDeleteTask }: IProps) {
  return (
    <>
      <p>Are you shure</p>
      <button onClick={handleDeleteTask}>yes</button>
      <button onClick={() => setDeleteTaskModal(false)}>no</button>
    </>
  );
}

export default DeleteTaskModal;
