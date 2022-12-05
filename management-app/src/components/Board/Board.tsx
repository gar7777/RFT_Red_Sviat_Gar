import React, { useState, useEffect } from 'react';
import { CssBaseline, Stack, Button, Box, CircularProgress } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import spinnerStyles from '../../scss/Spinner.module.scss';
import AddColumnModal from './AddColumnModal';
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
  IColumnTitle,
  IDeleteColumn,
  ICreateColumn,
  ILoadedColumn,
  IUpdateColumn,
} from '../../store/columns/types/columns.type';
import { i18n } from '../../features/i18n';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../ConfirmModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ComlumnList } from './ColumnListDnd';
import type { DropResult } from 'react-beautiful-dnd';
import { ILoadedColumnTasks, ITaskFull, IUpdateTask } from '../../store/tasks/types/tasks.types';
import { deleteTask, getAllTasks, updateTask } from '../../store/tasks/thunks/tasks.thunks';
import { resetTasks } from '../../store/tasks/reducers/tasks.slice';
import { resetColumns } from '../../store/columns/reducers/columns.slice';
import { API_URL } from '../../constants/api';
import { getTokenFromLS } from '../../utilities/getToken';
import mainStyles from '../Main/Main.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { addNewTaskInColumn, getTaskById } from '../../api/tasksApi';

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
  const { isLoading } = useAppSelector((state) => state.columns);
  const currentColumn = useAppSelector((state: RootState) => state.columns.currentColumn);
  const currentTasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.board !== boardId) {
      navigate('/boards');
    }
  }, [params]);

  useEffect(() => {
    localStorage.setItem('currentBoard', boardId);
    localStorage.setItem('currentBoardTitle', boardTitle);
    return () => {
      dispatch(resetTasks());
      dispatch(resetColumns());
    };
  }, []);

  useEffect(() => {
    setCurrentColumns([...columns]);
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

  async function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
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
      return;
    }

    const start = result.source.droppableId;
    const finish = result.destination.droppableId;
    const [startColumn] = currentTasks.filter((column: ILoadedColumnTasks) => column.id === start);
    const [finishColumn] = currentTasks.filter(
      (column: ILoadedColumnTasks) => column.id === finish
    );
    const startTasks = [...startColumn.tasks];
    const finishTasks = [...finishColumn.tasks];

    if (start === finish && result.type === 'tasks') {
      const tasks = [...startColumn.tasks];
      tasks.sort((a: ITaskFull, b: ITaskFull) => (a.order > b.order ? 1 : -1));
      const [removed] = tasks.splice(result.source.index, 1);
      tasks.splice(result!.destination!.index, 0, removed);

      tasks.forEach(async (task: ITaskFull, index: number) => {
        const updateBody: IUpdateTask = {
          title: task.title,
          description: task.description,
          boardId,
          columnId: result.source.droppableId,
          id: task.id,
          userId: task.userId,
          order: index + 1,
        };
        await dispatch(updateTask(updateBody));
      });
      return;
    }

    startTasks.sort((a: ITaskFull, b: ITaskFull) => (a.order > b.order ? 1 : -1));
    const [removed] = startTasks.splice(result.source.index, 1);
    await dispatch(deleteTask({ boardId, columnId: start, taskId: removed.id }));
    await dispatch(getAllTasks({ boardId, columnId: start }));

    const taskCreateData = {
      boardId,
      columnId: finish,
      title: removed.title,
      description: removed.description,
      userId: removed.userId,
    };

    const { id } = await addNewTaskInColumn(taskCreateData);
    const loadedTask = await getTaskById({ boardId, columnId: finish, taskId: id });
    const newTask = {
      id: loadedTask.id,
      title: loadedTask.title,
      order: loadedTask.order,
      description: loadedTask.description,
      userId: loadedTask.userId,
      files: loadedTask.files,
    };
    finishTasks.sort((a: ITaskFull, b: ITaskFull) => (a.order > b.order ? 1 : -1));
    finishTasks.splice(result!.destination!.index, 0, newTask);

    const updatedFinishTasks = finishTasks.map((task, index) => {
      return {
        ...task,
        order: index + 1,
      };
    });

    updatedFinishTasks.forEach(async (task: ITaskFull, index: number) => {
      const updateBody: IUpdateTask = {
        title: task.title,
        description: task.description,
        boardId,
        columnId: result!.destination!.droppableId,
        id: task.id,
        userId: task.userId,
        order: index + 1,
      };
      await dispatch(updateTask(updateBody));
    });

    await dispatch(getAllTasks({ boardId, columnId: finish }));

    return;
  }

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const addColumn = async ({ title }: IColumnTitle) => {
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

  const handleBackToBoards = () => {
    navigate('/boards');
  };

  return (
    <div className={mainStyles.mainContainer}>
      {isLoading && (
        <div className={spinnerStyles.spinner__container}>
          <CircularProgress />
        </div>
      )}
      <CssBaseline />
      <div className={styles.wrapper}>
        <Stack className={styles.nameWrapper} direction="row">
          <Button onClick={handleBackToBoards}>
            <ArrowBackIcon /> <span className={styles.btnName}>{i18n[lang].backToBoards}</span>
          </Button>
          <h2 className={typographyStyles.h2} style={{ margin: '0' }}>
            {boardTitle}
          </h2>
          <Button onClick={handleAddColumn}>
            <AddBoxIcon /> <span className={styles.btnName}>{i18n[lang].addColumn}</span>
          </Button>
        </Stack>
        <Box className={styles.boardsContainer}>
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
            <AddColumnModal
              addColumn={addColumn}
              addColumnModal={addColumnModal}
              setAddColumnModal={setAddColumnModal}
            />
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
    </div>
  );
}

export default Board;
