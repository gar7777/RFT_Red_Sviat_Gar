import React, { Dispatch, SetStateAction } from 'react';
import { l18n } from '../../features/l18n';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  handleDeleteTask: () => Promise<void>;
}

function DeleteTaskModal({ setDeleteTaskModal, handleDeleteTask }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  return (
    <>
      <p>{l18n[lang].wantDeleteTask}</p>
      <button onClick={handleDeleteTask}>{l18n[lang].yes}</button>
      <button onClick={() => setDeleteTaskModal(false)}>{l18n[lang].no}</button>
    </>
  );
}

export default DeleteTaskModal;
