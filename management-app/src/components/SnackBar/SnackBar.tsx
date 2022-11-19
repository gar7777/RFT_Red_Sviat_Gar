import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSnackBarIsClose } from '../../store/snack/reducers/snack.slice';
import { RootState } from '../../store/store';
import Portal from '@mui/base/Portal';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, allertType, allertMessage } = useAppSelector((state: RootState) => state.snack);
  return (
    <Portal>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(setSnackBarIsClose())}
      >
        <Alert
          onClose={() => dispatch(setSnackBarIsClose())}
          severity={allertType}
          sx={{ width: '100%' }}
        >
          {allertMessage}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default SnackBar;
