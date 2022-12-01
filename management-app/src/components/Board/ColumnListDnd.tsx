import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ILoadedColumn } from '../../store/columns/types/columns.type';
import Column from './Column';

interface IColumnList {
  columns: ILoadedColumn[];
  boardId: string;
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
}

interface IProps {
  id: string;
  title: string;
  boardId: string;
  order: number;
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
  index: number;
}

function ColumnDND({ id, title, boardId, order, setDeleteConfirmModal, index }: IProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Column
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={id}
          id={id}
          title={title}
          boardId={boardId}
          order={order}
          setDeleteConfirmModal={setDeleteConfirmModal}
        />
      )}
    </Draggable>
  );
}

export const ComlumnList = React.memo<IColumnList>(function ColumnDndList({
  columns,
  boardId,
  setDeleteConfirmModal,
}: IColumnList) {
  return (
    <>
      {columns.map((column: ILoadedColumn, index: number) => (
        <ColumnDND
          {...column}
          boardId={boardId}
          setDeleteConfirmModal={setDeleteConfirmModal}
          index={index}
          key={column.id}
        />
      ))}
    </>
  );
});
