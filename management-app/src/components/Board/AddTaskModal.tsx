import { Box, Typography, TextField, Button, Dialog } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../store/columns/types/columns.type';
import overlayStyles from '../../scss/Overlay.module.scss';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';

interface IProps {
  addTask: (data: IFormData) => void;
  closeTaskModal: () => void;
  addTaskModal: boolean;
}

function AddTaskModal({ addTask, closeTaskModal, addTaskModal }: IProps) {
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
          onSubmit={handleSubmit((data) => addTask(data as IFormData))}
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
    </Dialog>
  );
}

export default AddTaskModal;
