import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Divider,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Task from './Task';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Column.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadColumns, updateColumn } from '../../store/columns/thunks/columns.thunks';
import { createTask, deleteTask, getAllTasks } from '../../store/tasks/thunks/tasks.thunks';
import AddTaskModal from './AddTaskModal';
import {
  ILoadedColumnTasks,
  ITaskCreateData,
  ITaskFull,
} from '../../store/tasks/types/tasks.types';
import UpdateTaskModal from './UpdateTaskModal';
import { i18n } from '../../features/i18n';
import ConfirmModal from '../ConfirmModal';
import { setCurrentColumn } from '../../store/columns/reducers/columns.slice';
import { loadUsers } from '../../store/user/thunks/loadUser.thunks';
import { DraggableProvided, Droppable } from 'react-beautiful-dnd';
import { RootState } from '../../store/store';

interface IProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
  setDeleteConfirmModal: Dispatch<SetStateAction<boolean>>;
  innerRef: (element?: HTMLElement | null | undefined) => void;
  provided: DraggableProvided;
}

function Column({
  id,
  title,
  boardId,
  order,
  setDeleteConfirmModal,
  innerRef,
  provided,
  ...props
}: IProps) {
  const { lang } = useAppSelector((state: RootState) => state.lang);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [prevTitle, setPrevTitle] = useState('');
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const currentTasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [tasksArray] = currentTasks.filter((task: ILoadedColumnTasks) => task.id === id);
  const [tasks, setTasks] = useState<ITaskFull[]>([]);
  const { user } = useAppSelector((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState(user.name);
  const currentTask = useAppSelector((state: RootState) => state.tasks.currentTask);
  const dispatch = useAppDispatch();

  const columnTaskData = {
    boardId,
    columnId: id,
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(loadColumns(boardId));
  }, [isEditingTitle]);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    if (tasksArray) {
      const sortedTasks: ITaskFull[] = [...tasksArray.tasks];
      setTasks(sortedTasks.sort((a, b) => a.order - b.order));
    }
  }, [currentTasks]);

  useEffect(() => {
    dispatch(getAllTasks(columnTaskData));
  }, [updateTaskModal]);

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
    dispatch(getAllTasks(columnTaskData));
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
    const createTasksData: ITaskCreateData = {
      boardId: boardId,
      columnId: id,
      title: data.title,
      description: data.description,
      userId: data.userId,
    };
    await dispatch(createTask(createTasksData));
    dispatch(getAllTasks(columnTaskData));
    setAddTaskModal(false);
  };

  return (
    <>
      <Card variant="outlined" className={styles.column} ref={innerRef} {...props}>
        <Box {...provided.dragHandleProps} className={styles.headingWrapper}>
          {isEditingTitle ? (
            <Stack direction="row" component="form" className={styles.formWrapper}>
              <TextField
                value={currentTitle}
                variant="standard"
                id="title"
                {...register('title', {
                  minLength: { value: 3, message: i18n[lang].minLength },
                })}
                autoComplete="Title"
                onChange={handleTitleChange}
                onBlur={handleTitleOnBlur}
                onKeyDown={handleTitleOnKeyPress}
                autoFocus
                className={styles.editing_input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: 'pointer', color: 'white' }}>
                      <CheckIcon onClick={handleEditTitle} />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.title && (
                <Typography component="p" align="center" variant="caption">
                  {errors.title.message as string}
                </Typography>
              )}
            </Stack>
          ) : (
            <Stack direction="row" component="form" className={styles.formWrapper}>
              <Typography
                component="h3"
                className={styles.h3}
                style={{
                  color: 'white',
                  fontWeight: 'normal',
                }}
              >
                {currentTitle}
              </Typography>
              <ModeEditIcon
                onClick={() => {
                  setIsEditingTitle(true);
                  setPrevTitle(currentTitle);
                }}
                sx={{ cursor: 'pointer', color: 'white' }}
              />
            </Stack>
          )}
        </Box>
        <Divider />
        <Droppable droppableId={id} type="tasks">
          {(provided, snapshot) => (
            <Box
              className={styles.tasks_wrapper}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                minHeight: '10px',
                backgroundColor: `${snapshot.isDraggingOver ? '#d1e6f9' : 'white'}`,
              }}
            >
              {tasks
                .sort((a, b) => a.order - b.order)
                .map(({ id, title, description, order, userId }, index) => (
                  <Task
                    key={id}
                    title={title}
                    description={description}
                    id={id}
                    userId={userId}
                    order={order}
                    setDeleteTaskModal={setDeleteTaskModal}
                    setUpdateTaskModal={setUpdateTaskModal}
                    index={index}
                    setUpdatedUser={setUpdatedUser}
                  />
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <Box className={styles.btnWrapper}>
          <Button onClick={handleAddTask} className={styles.btn}>
            <AddCardIcon /> {i18n[lang].addTask}
          </Button>
          <Button className={styles.btn}>
            <DeleteForeverIcon
              onClick={() => {
                dispatch(setCurrentColumn({ title, id, order }));
                setDeleteConfirmModal(true);
              }}
              sx={{ width: '30px' }}
            />
          </Button>
        </Box>
      </Card>
      {addTaskModal && (
        <AddTaskModal
          addTask={addTask}
          closeTaskModal={closeTaskModal}
          addTaskModal={addTaskModal}
          userId={user.id as string}
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
          userId={updatedUser as string}
        />
      )}
    </>
  );
}

export default Column;
