import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createBoard, deleteBoard, updateBoard } from '../thunks/loadBoards.thunk';

export const boardlistenerMiddleWare = createListenerMiddleware();

boardlistenerMiddleWare.startListening({
  actionCreator: createBoard.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'board is created',
        type: 'success',
      })
    );
  },
});

boardlistenerMiddleWare.startListening({
  actionCreator: createBoard.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});

boardlistenerMiddleWare.startListening({
  actionCreator: deleteBoard.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'board was deleted',
        type: 'success',
      })
    );
  },
});

boardlistenerMiddleWare.startListening({
  actionCreator: deleteBoard.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});

boardlistenerMiddleWare.startListening({
  actionCreator: updateBoard.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'board was updated',
        type: 'success',
      })
    );
  },
});

boardlistenerMiddleWare.startListening({
  actionCreator: updateBoard.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});
