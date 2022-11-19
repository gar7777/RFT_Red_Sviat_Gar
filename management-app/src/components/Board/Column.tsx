import { Button, Card, Stack, TextField, Typography, Box } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IData, ITask } from '../../types/board-types';
import Task from './Task';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Column.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { updateColumn } from '../../store/columns/thunks/columns.thunks';
import { createTask, deleteTask } from '../../store/tasks/thunks/tasks.thunks';
import AddTaskModal from './AddTaskModal';
import { ITaskFull } from '../../store/tasks/types/tasks.types';
import { API_URL } from '../../constants/api';
import { getTokenFromLS } from '../../utilities/getToken';
import DeleteTaskModal from '../DeleteTaskModal';
import UpdateTaskModal from '../UpdateTaskModal';

interface IProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  setDeletedColumn: Dispatch<SetStateAction<string>>;
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
}

function Column({ id, title, boardId, order, setDeletedColumn, setDeleteConfirmModal }: IProps) {
  const [isEditingTitle, setIsEdidingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [deletedTaskId, setDeletedTaskId] = useState('');
  const [tasks, setTasks] = useState<ITaskFull[]>([]);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleEditTitle = async () => {
    const columnUpdateData = {
      title: currentTitle,
      boardId: boardId,
      columnId: id,
      order: order,
    };
    await dispatch(updateColumn(columnUpdateData));
    setIsEdidingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleDeleteTask = async () => {
    const deleteData = {
      boardId: boardId,
      columnId: id,
      taskId: deletedTaskId,
    };
    await dispatch(deleteTask(deleteData));
    setDeleteTaskModal(false);
    setDeletedTaskId('');
  };

  const closeTaskModal = (): void => {
    setAddTaskModal(false);
  };

  const handleAddTask = (): void => {
    setAddTaskModal(true);
  };

  const addTask = async (data: IData) => {
    setAddTaskModal(false);
    const createTasksData = { ...data, boardId, columnId: id };
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
  }, [addTaskModal, deleteTaskModal]);

  return (
    <>
      <Card variant="outlined" className={styles.column}>
        {isEditingTitle ? (
          <Stack direction="row" component="form">
            <TextField
              margin="normal"
              fullWidth
              defaultValue={currentTitle}
              id="title"
              label="Title"
              {...register('title', {
                minLength: { value: 3, message: 'Title must be more than 3 symbols' },
              })}
              autoComplete="Title"
              onChange={handleTitleChange}
              // className={formStyles.validatedInput}
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
            <CheckIcon onClick={handleEditTitle} />
          </Stack>
        ) : (
          <Stack direction="row" component="form">
            <h2>{currentTitle}</h2>
            <ModeEditIcon onClick={() => setIsEdidingTitle(true)} />
          </Stack>
        )}
        <Box className={styles.tasks_wrapper}>
          {tasks.map(({ id, title, description }) => (
            <Task
              key={id}
              title={title}
              description={description}
              id={id}
              setDeleteTaskModal={setDeleteTaskModal}
              setUpdateTaskModal={setUpdateTaskModal}
              setDeletedTaskId={setDeletedTaskId}
            />
          ))}
        </Box>
        <Button onClick={handleAddTask}>
          <AddCardIcon /> ADD NEW TASK
        </Button>
        <Button>
          <DeleteForeverIcon
            onClick={() => {
              setDeletedColumn(id);
              setDeleteConfirmModal(true);
            }}
          />
        </Button>
      </Card>
      {addTaskModal && <AddTaskModal addTask={addTask} closeTaskModal={closeTaskModal} />}
      {deleteTaskModal && (
        <DeleteTaskModal
          handleDeleteTask={handleDeleteTask}
          setDeleteTaskModal={setDeleteTaskModal}
        />
      )}
      {updateTaskModal && <UpdateTaskModal />}
    </>
  );
}

export default Column;
