import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  todos: IElement[];
  setTodos: React.Dispatch<React.SetStateAction<IElement[]>>;
}

export default function AddBoardModal({
  open,
  setOpen,
  setInputText,
  todos,
  setTodos,
  inputText,
  description,
  setDescription,
}: IAddBoardModal) {
  const handleClose = () => setOpen(false);
  const textTitleHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };
  const descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        title: inputText,
        id: Math.random() * 1000,
        description: description,
      },
    ]);
    setInputText('');
    setDescription('');
    handleClose();
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
            onSubmit={submitHandler}
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Название"
              variant="standard"
              onChange={textTitleHandler}
              value={inputText}
            />
            <TextField
              id="outlined-textarea"
              label="Описание"
              placeholder="Описание"
              onChange={descriptionHandler}
              value={description}
              multiline
            />
            <Button type="submit" variant="outlined" size="small">
              Создать
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
