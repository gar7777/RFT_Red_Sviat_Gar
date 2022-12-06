import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSnackBarIsClose } from '../../store/snack/reducers/snack.slice';
import { RootState } from '../../store/store';
import { i18n } from '../../features/i18n';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const { isOpen, allertType, ruMessage, enMessage } = useAppSelector(
    (state: RootState) => state.snack
  );
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => dispatch(setSnackBarIsClose())}>
      <Alert
        onClose={() => dispatch(setSnackBarIsClose())}
        severity={allertType}
        sx={{ width: '100%' }}
      >
        {lang === 'RU' ? ruMessage : enMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
