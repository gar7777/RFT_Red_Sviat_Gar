import { Button, Card, Stack, TextField, Typography, Box, InputAdornment } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Task from './Task';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Column.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadColumns, updateColumn } from '../../store/columns/thunks/columns.thunks';
import { createTask, deleteTask } from '../../store/tasks/thunks/tasks.thunks';
import AddTaskModal from './AddTaskModal';
import { ITaskCreateData, ITaskFull } from '../../store/tasks/types/tasks.types';
import { API_URL } from '../../constants/api';
import { getTokenFromLS } from '../../utilities/getToken';
import UpdateTaskModal from './UpdateTaskModal';
import { i18n } from '../../features/i18n';
import ConfirmModal from '../ConfirmModal';
import { setCurrentColumn } from '../../store/columns/reducers/columns.slice';
import { loadUsers } from '../../store/user/thunks/loadUser.thunks';

interface IProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
  innerRef: (element?: HTMLElement | null | undefined) => void;
}

function Column({ id, title, boardId, order, setDeleteConfirmModal, innerRef, ...props }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [prevTitle, setPrevTitle] = useState('');
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [tasks, setTasks] = useState<ITaskFull[]>([]);
  const currentTask = useAppSelector((state) => state.tasks.currentTask);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(loadColumns(boardId));
  }, [isEditingTitle]);

  const handleEditTitle = async () => {
    const columnUpdateData = {
      title: currentTitle,
      boardId: boardId,
      columnId: id,
      order: order,
    };
    await dispatch(updateColumn(columnUpdateData));
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentColumn({ title, id, order }));
    setCurrentTitle(e.target.value);
  };

  const handleTitleOnBlur = () => {
    setCurrentTitle(prevTitle);
    setIsEditingTitle(false);
  };

  const handleTitleOnKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      console.log(currentTitle);
      handleEditTitle();
    }
    if (e.code === 'Escape') {
      handleTitleOnBlur();
    }
  };

  const handleDeleteTask = async () => {
    if (!currentTask) return;
    const deleteData = {
      boardId: boardId,
      columnId: id,
      taskId: currentTask.id,
    };
    await dispatch(deleteTask(deleteData));
    setDeleteTaskModal(false);
  };

  const closeTaskModal = (): void => {
    setAddTaskModal(false);
  };

  const handleAddTask = async (): Promise<void> => {
    setAddTaskModal(true);
    await dispatch(loadUsers());
  };

  const addTask = async (data: FieldValues) => {
    setAddTaskModal(false);
    const createTasksData: ITaskCreateData = {
      boardId: boardId,
      columnId: id,
      title: data.title,
      description: data.description,
      userId: data.userId,
    };
    await dispatch(createTask(createTasksData));
  };

  useEffect(() => {
    const getTasks = async (boardId: string, columnId: string) => {
      const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
      try {
        const data = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getTokenFromLS()}`,
          },
        });
        const json = await data.json();
        setTasks(json);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks(boardId, id);
  }, [addTaskModal, deleteTaskModal, updateTaskModal]);

  return (
    <>
      <Card variant="outlined" className={styles.column} ref={innerRef} {...props}>
        {isEditingTitle ? (
          <Stack direction="row" component="form">
            <TextField
              margin="normal"
              fullWidth
              value={currentTitle}
              id="title"
              label={i18n[lang].title}
              {...register('title', {
                minLength: { value: 3, message: i18n[lang].minLength },
              })}
              autoComplete="Title"
              onChange={handleTitleChange}
              onBlur={handleTitleOnBlur}
              onKeyDown={handleTitleOnKeyPress}
              autoFocus
              // className={formStyles.validatedInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CheckIcon onClick={handleEditTitle} />
                  </InputAdornment>
                ),
              }}
            />

            {errors.title && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                // className={formStyles.validationAlert}
              >
                {errors.title.message as string}
              </Typography>
            )}
          </Stack>
        ) : (
          <Stack direction="row" component="form">
            <h2>{currentTitle}</h2>
            <ModeEditIcon
              onClick={() => {
                setIsEditingTitle(true);
                setPrevTitle(currentTitle);
              }}
            />
          </Stack>
        )}
        <Box className={styles.tasks_wrapper}>
          {tasks.map(({ id, title, description, order }) => (
            <Task
              key={id}
              title={title}
              description={description}
              id={id}
              order={order}
              setDeleteTaskModal={setDeleteTaskModal}
              setUpdateTaskModal={setUpdateTaskModal}
            />
          ))}
        </Box>
        <Button onClick={handleAddTask}>
          <AddCardIcon /> {i18n[lang].addTask}
        </Button>
        <Button>
          <DeleteForeverIcon
            onClick={() => {
              dispatch(setCurrentColumn({ title, id, order }));
              setDeleteConfirmModal(true);
            }}
          />
        </Button>
      </Card>
      {addTaskModal && (
        <AddTaskModal
          addTask={addTask}
          closeTaskModal={closeTaskModal}
          addTaskModal={addTaskModal}
        />
      )}
      {deleteTaskModal && (
        <ConfirmModal
          confirm={handleDeleteTask}
          deny={setDeleteTaskModal}
          isOpen={deleteTaskModal}
          type={i18n[lang].task}
          title={currentTask?.title}
          action={i18n[lang].deleteS}
        />
      )}
      {updateTaskModal && (
        <UpdateTaskModal
          setUpdateTaskModal={setUpdateTaskModal}
          boardId={boardId}
          columnId={id}
          updateTaskModal={updateTaskModal}
        />
      )}
    </>
  );
}

export default Column;
