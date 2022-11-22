import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createColumn, deleteColumn, updateColumn } from '../thunks/columns.thunks';

export const columnListenerMiddleWare = createListenerMiddleware();

columnListenerMiddleWare.startListening({
  actionCreator: createColumn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'column is created',
        type: 'success',
      })
    );
  },
});

columnListenerMiddleWare.startListening({
  actionCreator: createColumn.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});

columnListenerMiddleWare.startListening({
  actionCreator: deleteColumn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'column was deleted',
        type: 'success',
      })
    );
  },
});

columnListenerMiddleWare.startListening({
  actionCreator: deleteColumn.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});

columnListenerMiddleWare.startListening({
  actionCreator: updateColumn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'column was updated',
        type: 'success',
      })
    );
  },
});

columnListenerMiddleWare.startListening({
  actionCreator: updateColumn.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});
