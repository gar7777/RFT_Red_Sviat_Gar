import React, { Dispatch, SetStateAction } from 'react';
import { l18n } from '../../features/l18n';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
  deletedColumn: string;
  handleDeleteColumn: (id: string) => void;
}

function DeleteConfirmModal({ setDeleteConfirmModal, deletedColumn, handleDeleteColumn }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  return (
    <>
      <p>{l18n[lang].wantDeleteColumn}</p>
      <button onClick={() => handleDeleteColumn(deletedColumn)}>{l18n[lang].yes}</button>
      <button onClick={() => setDeleteConfirmModal(false)}>{l18n[lang].no}</button>
    </>
  );
}

export default DeleteConfirmModal;
