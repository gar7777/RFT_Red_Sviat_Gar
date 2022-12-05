import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../store/columns/types/columns.type';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTask } from '../../store/tasks/thunks/tasks.thunks';
import { RootState } from '../../store/store';
import { i18n } from '../../features/i18n';
import { loadUsers } from '../../store/user/thunks/loadUser.thunks';
import styles from './Task.module.scss';

interface IProps {
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
  updateTaskModal: boolean;
  boardId: string;
  columnId: string;
  userId: string;
}

function UpdateTaskModal({
  setUpdateTaskModal,
  boardId,
  columnId,
  updateTaskModal,
  userId,
}: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const { users } = useAppSelector((state) => state.user);
  const [newUser, setNewUser] = useState<string | undefined>('');
  const dispatch = useAppDispatch();

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(loadUsers());
    setTimeout(() => setFocus('title'), 0);
    setTimeout(() => setNewUser(userId as string), 200);
  }, []);

  const handleUpdateTask = async (data: IFormData) => {
    const updateData = {
      ...data,
      userId: data.userId || (newUser as string),
      boardId,
      columnId,
      id: currentTask?.id as string,
      order: currentTask?.order as number,
    };
    await dispatch(updateTask(updateData));
    setUpdateTaskModal(false);
  };

  return (
    <Modal open={updateTaskModal} onClose={() => setUpdateTaskModal(false)}>
      <Box>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => handleUpdateTask(data as IFormData))}
          className={styles.addTaskContainer}
        >
          <Typography component="h3" className={typographyStyles.h3}>
            {i18n[lang].updateTask}
          </Typography>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              defaultValue={currentTask?.title}
              id="title"
              label={i18n[lang].title}
              {...register('title', {
                minLength: { value: 3, message: i18n[lang].minLength },
              })}
              autoComplete="Title"
              className={formStyles.validatedInput}
            />
            {errors.title && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.title.message as string}
              </Typography>
            )}
          </Box>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="none"
              fullWidth
              defaultValue={currentTask?.description}
              type="description"
              id="description"
              label={i18n[lang].description}
              {...register('description', {
                minLength: { value: 8, message: i18n[lang].minDescrLength },
              })}
              autoComplete="Description"
              className={formStyles.validatedInput}
            />
            {errors.description && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.description.message as string}
              </Typography>
            )}
          </Box>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">{i18n[lang].chooseUser} *</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              value={newUser}
              label={i18n[lang].chooseUser}
              fullWidth
              {...register('userId')}
              onChange={(e) => setNewUser(e.target.value)}
            >
              {users?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" fullWidth sx={{ marginTop: '1rem' }}>
            {i18n[lang].update}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UpdateTaskModal;
