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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { useAppSelector } from '../../store/hooks';
import { getTokenFromLS } from '../../utilities/getToken';
import decodeJwt from '../../utilities/jwtDecode';

interface IProps {
  addTask: (data: FieldValues) => void;
  closeTaskModal: () => void;
  addTaskModal: boolean;
}

function AddTaskModal({ addTask, closeTaskModal, addTaskModal }: IProps) {
  const { users } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  // const token = getTokenFromLS();
  // const userId = decodeJwt(token as string);
  const [newUser, setNewUser] = useState<string>('');
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const { lang } = useAppSelector((state) => state.lang);

  useEffect(() => {
    setTimeout(() => setFocus('title'), 0);
    setTimeout(() => setNewUser(user.id as string), 400);
  }, []);

  return (
    <Dialog open={addTaskModal} onClose={closeTaskModal}>
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          {i18n[lang].addTask}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data: FieldValues) => addTask({ ...data, userId: newUser }))}
          sx={{ mt: 1 }}
        >
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
              margin="normal"
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
          <Button variant="contained" type="submit" fullWidth>
            {i18n[lang].add}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddTaskModal;
