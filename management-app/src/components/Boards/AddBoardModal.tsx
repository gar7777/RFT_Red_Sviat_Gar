import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createBoard, loadBoards, updateBoard } from '../../store/boards/thunks/loadBoards.thunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm, FieldValues } from 'react-hook-form';
import { IBoard, TBoardCreate } from '../../store/boards/types/boards.type';
import { Typography } from '@mui/material';
import { i18n } from '../../features/i18n';
import styles from './Boards.module.scss';
import formStyles from '../../scss/Form.module.scss';

interface IAddBoardModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  currentBoard: IBoard | null;
}

export default function AddBoardModal({ open, setOpen, isEditing, currentBoard }: IAddBoardModal) {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    reset({
      title: currentBoard?.title || '',
      description: currentBoard?.description || '',
    });
  }, [currentBoard]);

  const handleClose = () => setOpen(false);

  const formSubmit = async (data: FieldValues) => {
    if (isEditing && currentBoard?.id) {
      await dispatch(
        updateBoard({
          title: data.title,
          id: currentBoard.id,
          description: data.description,
        })
      );
    } else {
      await dispatch(createBoard(data as TBoardCreate));
    }
    reset();
    handleClose();
    dispatch(loadBoards());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.addBoardModal}>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{
              '& > :not(style)': { m: 1, width: '28ch' },
            }}
            noValidate
            autoComplete="off"
            className={styles.modalForm}
          >
            <TextField
              id="title"
              label={i18n[lang].title}
              variant="standard"
              {...register('title', {
                required: i18n[lang].titleMustBeFilled,
                minLength: { value: 3, message: i18n[lang].minLength },
                maxLength: { value: 40, message: i18n[lang].maxLength30 },
              })}
              className={styles.modalInput}
            />
            {errors.title && (
              <Typography component="p" align="center" variant="caption" style={{ color: 'red' }}>
                {errors.title.message as string}
              </Typography>
            )}
            <TextField
              id="description"
              label={i18n[lang].description}
              placeholder="description"
              {...register('description', {
                required: i18n[lang].titleMustBeFilled,
                minLength: { value: 3, message: i18n[lang].minLength },
              })}
              multiline
              className={[styles.modalInput, styles.description].join(' ')}
            />
            {errors.description && (
              <Typography component="p" align="center" variant="caption" style={{ color: 'red' }}>
                {errors.description.message as string}
              </Typography>
            )}
            <Button type="submit" variant="contained" size="small" className={styles.modalButton}>
              {isEditing ? i18n[lang].update : i18n[lang].create}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
