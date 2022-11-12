import { Box, Typography, TextField, Button } from '@mui/material';
import {
  formContainerStyles,
  h2Styles,
  labelWrapperStyles,
  validatedInputStyles,
  validationAlertStyles,
} from '../../constants/mui-styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IData } from '../../types/board-types';

interface IProps {
  addTask: (data: IData) => void;
}

function AddTaskModal({ addTask }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box sx={formContainerStyles}>
      <Typography component="h2" variant="h4" sx={h2Styles}>
        Add New Task
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => addTask(data as IData))}
        sx={{ mt: 1 }}
      >
        <Box sx={labelWrapperStyles}>
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
            sx={validatedInputStyles}
          />
          {errors.title && (
            <Typography component="p" align="center" variant="caption" sx={validationAlertStyles}>
              {errors.title.message as string}
            </Typography>
          )}
        </Box>
        <Box sx={labelWrapperStyles}>
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
            sx={validatedInputStyles}
          />
          {errors.description && (
            <Typography component="p" align="center" variant="caption" sx={validationAlertStyles}>
              {errors.description.message as string}
            </Typography>
          )}
        </Box>
        <Button variant="contained" type="submit" fullWidth>
          Add New Task
        </Button>
      </Box>
    </Box>
  );
}

export default AddTaskModal;