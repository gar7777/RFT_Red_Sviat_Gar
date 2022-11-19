import { Button, Card, Stack, TextField, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IData, ITask } from '../../types/board-types';
import Task from './Task';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Column.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateColumn } from '../../store/columns/thunks/columns.thunks';
import { createTask, loadTasks } from '../../store/tasks/thunks/tasks.thunks';
import AddTaskModal from './AddTaskModal';

interface IProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  handleDeleteColumn: (id: string) => void;
}

function Column({ id, title, boardId, order, handleDeleteColumn }: IProps) {
  const [isEditingTitle, setIsEdidingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();
  const loadTasksData = {
    boardId: boardId,
    columnId: id,
  };

  useEffect(() => {
    dispatch(loadTasks(loadTasksData));
  }, []);

  const handleEditTitle = async () => {
    const columnUpdateData = {
      title: currentTitle,
      boardId: boardId,
      columnId: id,
      order: order,
    };
    await dispatch(updateColumn(columnUpdateData));
    await dispatch(loadTasks(loadTasksData));
    setIsEdidingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
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
    await dispatch(loadTasks(loadTasksData));
  };

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
            <Task key={id} title={title} description={description} />
          ))}
        </Box>
        <Button onClick={handleAddTask}>
          <AddCardIcon /> ADD NEW TASK
        </Button>
        <Button>
          <DeleteForeverIcon onClick={() => handleDeleteColumn(id)} />
        </Button>
      </Card>
      {addTaskModal && <AddTaskModal addTask={addTask} closeTaskModal={closeTaskModal} />}
    </>
  );
}

export default Column;
