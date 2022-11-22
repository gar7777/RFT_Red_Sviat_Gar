import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IData } from '../../types/board-types';
import overlayStyles from '../scss/Overlay.module.scss';
import formStyles from '../scss/Form.module.scss';
import typographyStyles from '../scss/Typography.module.scss';
import { useAppSelector } from '../../store/hooks';
import { l18n } from '../../features/l18n';

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
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <div className={overlayStyles.overlay} onClick={closeTaskModal}></div>
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          {l18n[lang].addTask}
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
              label={l18n[lang].title}
              {...register('title', {
                required: l18n[lang].enterTitle,
                minLength: { value: 3, message: l18n[lang].minLength },
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
              label={l18n[lang].description}
              {...register('description', {
                required: l18n[lang].enterDescription,
                minLength: { value: 8, message: l18n[lang].minDescrLength },
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
            {l18n[lang].add}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddTaskModal;
