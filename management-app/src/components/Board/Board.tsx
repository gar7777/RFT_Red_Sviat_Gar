import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { CssBaseline, Stack, Button, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AddColumnModal from './AddColumnModal';
import Column from './Column';
import styles from './Board.module.scss';
import { useParams } from 'react-router';
import { IBoard } from '../../store/boards/types/boards.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import {
  createColumn,
  loadColumns,
  deleteColumn,
  updateColumn,
} from '../../store/columns/thunks/columns.thunks';
import {
  IColumn,
  IDeleteColumn,
  ICreateColumn,
  ILoadedColumn,
  IUpdateColumn,
} from '../../store/columns/types/columns.type';
import { i18n } from '../../features/i18n';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../ConfirmModal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ComlumnList } from './ColumnListDnd';
import type { DropResult } from 'react-beautiful-dnd';

import { loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { getTasks } from '../../utilities/getTasks';
import { ITaskFull, IUpdateTask, IUpdateTaskData } from '../../store/tasks/types/tasks.types';
import { loadTasks, updateTask } from '../../store/tasks/thunks/tasks.thunks';

function Board() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state: RootState) => state.boards);
  const currentBoard = boards.find((board: IBoard) => board.id === params.board);
  const boardId = currentBoard?.id || localStorage.getItem('currentBoard') || '';
  const boardTitle = currentBoard?.title || localStorage.getItem('currentBoardTitle') || '';
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const { columns } = useAppSelector((state: RootState) => state.columns);
  const [currentColumns, setCurrentColumns] = useState<ILoadedColumn[]>([]);
  const { lang } = useAppSelector((state: RootState) => state.lang);
  const currentColumn = useAppSelector((state: RootState) => state.columns.currentColumn);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.board !== boardId) {
      navigate('/boards');
    }
  }, [params]);

  useEffect(() => {
    setCurrentColumns([...columns]);
    return () => {
      localStorage.setItem('currentBoard', boardId);
      localStorage.setItem('currentBoardTitle', boardTitle);
    };
  }, [columns]);

  useEffect(() => {
    dispatch(loadColumns(boardId));
  }, [addColumnModal, deleteConfirmModal]);

  const reorder = (list: ILoadedColumn[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    if (result.type === 'columns') {
      const columns = reorder(currentColumns, result.source.index, result.destination.index);

      const orderedColumns = columns.map((column, index) => {
        const updateBody: IUpdateColumn = {
          boardId,
          title: column.title,
          columnId: column.id,
          order: index + 1,
        };
        dispatch(updateColumn(updateBody));
        return { ...column, order: index + 1 };
      });

      setCurrentColumns(orderedColumns);
    }

    const start = result.source.droppableId;
    const finish = result.destination.droppableId;

    if (start === finish && result.type === 'tasks') {
      getTasks(boardId, result.source.droppableId).then((tasks) => {
        // console.log(result.source.index);
        // console.log(result!.destination!.index);
        console.log(tasks);
        tasks.sort((a: ITaskFull, b: ITaskFull) => (a.order > b.order ? 1 : -1));
        console.log(tasks);
        const [removed] = tasks.splice(result.source.index, 1);
        tasks.splice(result!.destination!.index, 0, removed);
        console.log(tasks);

        tasks.forEach((task: ITaskFull, index: number) => {
          const updateBody: IUpdateTask = {
            title: task.title,
            description: task.description,
            boardId,
            columnId: result.source.droppableId,
            id: task.id,
            userId: task.userId,
            order: index + 1,
          };
          // console.log(updateBody);
          dispatch(updateTask(updateBody));
          // dispatch(loadColumns(boardId));
        });
      });
    }
  }

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const addColumn = async ({ title }: IColumn) => {
    const columnData: ICreateColumn = {
      title: title,
      boardId: boardId,
    };
    await dispatch(createColumn(columnData));
    await dispatch(loadColumns(boardId));
    setAddColumnModal(false);
  };

  const handleDeleteColumn = async (): Promise<void> => {
    if (!currentColumn) return;
    const deleteData: IDeleteColumn = {
      id: currentColumn.id,
      boardId: boardId,
    };
    await dispatch(deleteColumn(deleteData));
    await dispatch(loadColumns(boardId));
    setDeleteConfirmModal(false);
  };

  const closeColumnModal = (): void => {
    setAddColumnModal(false);
  };

  return (
    <div className={styles.board__wrapper}>
      <CssBaseline />
      <Stack className={styles.board_name__wrapper} direction="row">
        <Link to="/boards">
          <Button>
            <ArrowBackIcon /> {i18n[lang].backToBoards}
          </Button>
        </Link>
        <h2 style={{ marginTop: '0.3rem', marginRight: '2rem' }}>{boardTitle}</h2>
        <Button onClick={handleAddColumn}>
          <AddBoxIcon /> {i18n[lang].addColumn}
        </Button>
      </Stack>
      <Box component="main" maxWidth="xs" className={styles['board__main-container']}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="columns">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.columnList}
              >
                <ComlumnList
                  columns={currentColumns}
                  boardId={boardId}
                  setDeleteConfirmModal={setDeleteConfirmModal}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {addColumnModal && (
          <AddColumnModal addColumn={addColumn} closeColumnModal={closeColumnModal} />
        )}
        {deleteConfirmModal && (
          <ConfirmModal
            confirm={handleDeleteColumn}
            deny={setDeleteConfirmModal}
            isOpen={deleteConfirmModal}
            type={i18n[lang].columnS}
            title={currentColumn?.title}
            action={i18n[lang].deleteS}
          />
        )}
      </Box>
    </div>
  );
}

export default Board;
