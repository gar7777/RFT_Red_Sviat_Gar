import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createColumn, deleteColumn, updateColumn } from '../thunks/columns.thunks';
import { i18n } from '../../../features/i18n';
import { enLang, ruLang } from '../../../utilities/getLang';

export const columnListenerMiddleWare = createListenerMiddleware();

columnListenerMiddleWare.startListening({
  actionCreator: createColumn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackColumnCreated,
        ruMessage: i18n[ruLang].snackColumnCreated,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
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
        enMessage: i18n[enLang].snackColumnDeleted,
        ruMessage: i18n[ruLang].snackColumnDeleted,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
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
        enMessage: i18n[enLang].snackColumnUpdated,
        ruMessage: i18n[ruLang].snackColumnUpdated,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
        type: 'error',
      })
    );
  },
});
