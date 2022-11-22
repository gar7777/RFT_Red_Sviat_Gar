import React, { Dispatch, JSXElementConstructor, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface IProps {
  confirm: () => void | Promise<void>;
  deny: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  title: string | undefined;
  type: string | undefined;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmModal({ confirm, deny, isOpen, title, type }: IProps) {
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => deny(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{'Warning!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete <strong>{title}</strong> {type}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deny(false)}>No</Button>
          <Button onClick={confirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;
