import { Box, Typography, TextField, Button, IconButton, Dialog } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../store/columns/types/columns.type';
import CloseIcon from '@mui/icons-material/Close';
import overlayStyles from '../../scss/Overlay.module.scss';
import formStyles from '../../scss/Form.module.scss';
import styles from './Column.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { IColumnTitle } from '../../store/columns/types/columns.type';
import { useAppSelector } from '../../store/hooks';
import { i18n } from '../../features/i18n';

interface IProps {
  addColumn: (data: IColumnTitle) => void;
  setAddColumnModal: Dispatch<SetStateAction<boolean>>;
  addColumnModal: boolean;
}

function AddColumnModal({ addColumn, setAddColumnModal, addColumnModal }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <Dialog open={addColumnModal} onClose={() => setAddColumnModal(false)}>
      <Box className={styles.addColumnModal}>
        <Box>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => addColumn(data as IFormData))}
            className={styles.modalForm}
          >
            <Typography component="h3" className={typographyStyles.h3}>
              {i18n[lang].addColumn}
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
                className={formStyles.validatedInput}
                autoFocus
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
            <Button variant="contained" type="submit" fullWidth>
              {i18n[lang].add}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddColumnModal;
