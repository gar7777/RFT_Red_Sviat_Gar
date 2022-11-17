import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createBoard, loadBoards, updateBoard } from '../../store/boards/thunks/loadBoards.thunk';
import { useAppDispatch } from '../../store/hooks';
import { useForm, FieldValues } from 'react-hook-form';
import { IBoard, TBoardCreate } from '../../store/boards/types/boards.type';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IAddBoardModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  currentBoard: IBoard | null;
}

export default function AddBoardModal({ open, setOpen, isEditing, currentBoard }: IAddBoardModal) {
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
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="title"
              label="title"
              variant="standard"
              {...register('title', {
                required: 'title must be filled',
                minLength: { value: 3, message: 'at least 3 symbols' },
              })}
            />
            {errors.title && (
              <Typography component="p" align="center" variant="caption" style={{ color: 'red' }}>
                {errors.title.message as string}
              </Typography>
            )}
            <TextField
              id="description"
              label="description"
              placeholder="description"
              {...register('description', {
                required: 'description must be filled',
                minLength: { value: 3, message: 'at least 3 symbols' },
              })}
              multiline
            />
            {errors.description && (
              <Typography component="p" align="center" variant="caption" style={{ color: 'red' }}>
                {errors.description.message as string}
              </Typography>
            )}
            <Button type="submit" variant="outlined" size="small">
              {isEditing ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
