import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createBoard, deleteBoard, updateBoard } from '../thunks/loadBoards.thunk';
import { i18n } from '../../../features/i18n';
import { getLangfromLS } from '../../../utilities/getLang';

export const boardlistenerMiddleWare = createListenerMiddleware();

const lang = getLangfromLS();

boardlistenerMiddleWare.startListening({
  actionCreator: createBoard.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackBoardCreated,
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
        message: i18n[lang].snackError,
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
        message: i18n[lang].snackBoardDeleted,
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
        message: i18n[lang].snackError,
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
        message: i18n[lang].snackBoardUpdated,
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
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});
