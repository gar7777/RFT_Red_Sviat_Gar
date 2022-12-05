import { i18n } from '../../features/i18n';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import formStyles from '../../scss/Form.module.scss';
import styles from './Task.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  addTask: (data: FieldValues) => void;
  closeTaskModal: () => void;
  addTaskModal: boolean;
}

function AddTaskModal({ addTask, closeTaskModal, addTaskModal }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  const { users } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const [newUser, setNewUser] = useState<string>('');
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeout(() => setFocus('title'), 0);
    setTimeout(() => setNewUser(user.id as string), 400);
  }, []);

  return (
    <Modal open={addTaskModal} onClose={closeTaskModal}>
      <Box>
        <Box
          component="form"
          onSubmit={handleSubmit((data: FieldValues) => addTask({ ...data, userId: newUser }))}
          className={styles.addTaskContainer}
        >
          <Typography component="h3" className={typographyStyles.h3}>
            {i18n[lang].addTask}
          </Typography>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label={i18n[lang].title}
              {...register('title', {
                required: i18n[lang].enterTitle,
                minLength: { value: 3, message: i18n[lang].minLength },
              })}
              autoComplete="Title"
              // className={formStyles.validatedInput}
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
              required
              fullWidth
              type="description"
              id="description"
              label={i18n[lang].description}
              {...register('description', {
                required: i18n[lang].enterDescription,
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
              required
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
            {i18n[lang].add}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddTaskModal;
