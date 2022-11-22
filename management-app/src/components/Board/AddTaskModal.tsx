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
} from '@mui/material';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IFormData } from '../../store/columns/types/columns.type';
import overlayStyles from '../../scss/Overlay.module.scss';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { IUsersLoad } from '../../store/user/types/user.types';
import { useAppSelector } from '../../store/hooks';
import { IAddTaskData } from '../../store/tasks/types/tasks.types';
import { getTokenFromLS } from '../../utilities/getToken';
import decodeJwt from '../../utilities/jwtDecode';

interface IProps {
  addTask: (data: FieldValues) => void;
  closeTaskModal: () => void;
  addTaskModal: boolean;
}

function AddTaskModal({ addTask, closeTaskModal, addTaskModal }: IProps) {
  const token = getTokenFromLS();
  const userId = decodeJwt(token as string);
  const [newUser, setNewUser] = useState<string>(userId);
  const { users } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Dialog open={addTaskModal} onClose={closeTaskModal}>
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Add New Task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data: FieldValues) => addTask(data))}
          sx={{ mt: 1 }}
        >
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              {...register('title', {
                required: 'Please, enter title',
                minLength: { value: 3, message: 'Title must be more than 3 symbols' },
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
              margin="normal"
              required
              fullWidth
              type="description"
              id="description"
              label="Description"
              {...register('description', {
                required: 'Please, enter description',
                minLength: { value: 8, message: 'Description must be more than 8 symbols' },
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
            <InputLabel id="user-select-label">Choose user</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              defaultValue={userId}
              value={newUser}
              label="Choose user"
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
          <Button variant="contained" type="submit" fullWidth>
            Add New Task
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddTaskModal;
