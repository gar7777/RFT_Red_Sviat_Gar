import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createBoard, deleteBoard, updateBoard } from '../thunks/loadBoards.thunk';
import { i18n } from '../../../features/i18n';
import { enLang, ruLang } from '../../../utilities/getLang';

export const boardlistenerMiddleWare = createListenerMiddleware();

boardlistenerMiddleWare.startListening({
  actionCreator: createBoard.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackBoardCreated,
        ruMessage: i18n[ruLang].snackBoardCreated,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
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
        enMessage: i18n[enLang].snackBoardDeleted,
        ruMessage: i18n[ruLang].snackBoardDeleted,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
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
        enMessage: i18n[enLang].snackBoardUpdated,
        ruMessage: i18n[ruLang].snackBoardUpdated,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
        type: 'error',
      })
    );
  },
});
