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
import { l18n } from '../features/l18n';
import { useAppSelector } from '../store/hooks';

interface IProps {
  confirm: () => void | Promise<void>;
  deny: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  title: string | undefined;
  type: string | undefined;
  action?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmModal({ confirm, deny, isOpen, title, type, action }: IProps) {
  const { lang } = useAppSelector((state) => state.lang);

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
          {lang === 'EN' ? (
            <DialogContentText id="alert-dialog-slide-description">
              {l18n[lang].areYouShure} {action} <strong>{title}</strong> {type}?
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              {l18n[lang].areYouShure} {action} {type} <strong>{title}</strong>?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deny(false)}>{l18n[lang].no}</Button>
          <Button onClick={confirm}>{l18n[lang].yes}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;
