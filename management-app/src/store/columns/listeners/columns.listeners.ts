import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createColumn, deleteColumn, updateColumn } from '../thunks/columns.thunks';
import { i18n } from '../../../features/i18n';
import { getLangfromLS } from '../../../utilities/getLang';

export const columnListenerMiddleWare = createListenerMiddleware();

const lang = getLangfromLS();

columnListenerMiddleWare.startListening({
  actionCreator: createColumn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackColumnCreated,
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
        message: i18n[lang].snackError,
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
        message: i18n[lang].snackColumnDeleted,
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
        message: i18n[lang].snackError,
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
        message: i18n[lang].snackColumnUpdated,
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
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});
