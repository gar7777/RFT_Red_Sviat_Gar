import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IData } from '../../types/board-types';
import overlayStyles from '../scss/Overlay.module.scss';
import formStyles from '../scss/Form.module.scss';
import typographyStyles from '../scss/Typography.module.scss';

interface IProps {
  addTask: (data: IData) => void;
  closeTaskModal: () => void;
}

function AddTaskModal({ addTask, closeTaskModal }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className={overlayStyles.overlay} onClick={closeTaskModal}></div>
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Add New Task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => addTask(data as IData))}
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
          <Button variant="contained" type="submit" fullWidth>
            Add New Task
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddTaskModal;
