import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createBoard, loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { useAppDispatch } from '../../store/hooks';
import { useForm, FieldValues } from 'react-hook-form';
import { TBoardCreate } from '../../store/boards/types/boards.type';

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

export interface IElement {
  title: string;
  id: number;
  description: string;
}

interface IAddBoardModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddBoardModal({ open, setOpen }: IAddBoardModal) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

  const formSubmit = (data: FieldValues) => {
    dispatch(createBoard(data as TBoardCreate));
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
                required: 'Please, enter title',
              })}
            />
            <TextField
              id="description"
              label="description"
              placeholder="description"
              {...register('description', {
                required: 'Please, enter title',
              })}
              multiline
            />
            <Button type="submit" variant="outlined" size="small">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
