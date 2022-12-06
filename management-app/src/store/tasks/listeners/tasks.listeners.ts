import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createTask, deleteTask, updateTask } from '../thunks/tasks.thunks';
import { i18n } from '../../../features/i18n';
import { enLang, ruLang } from '../../../utilities/getLang';

export const taskListenerMiddleWare = createListenerMiddleware();

taskListenerMiddleWare.startListening({
  actionCreator: createTask.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackTaskCreated,
        ruMessage: i18n[ruLang].snackTaskCreated,
        type: 'success',
      })
    );
  },
});

taskListenerMiddleWare.startListening({
  actionCreator: createTask.rejected,
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

taskListenerMiddleWare.startListening({
  actionCreator: deleteTask.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackTaskDeleted,
        ruMessage: i18n[ruLang].snackTaskDeleted,
        type: 'success',
      })
    );
  },
});

taskListenerMiddleWare.startListening({
  actionCreator: deleteTask.rejected,
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

taskListenerMiddleWare.startListening({
  actionCreator: updateTask.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackTaskUpdated,
        ruMessage: i18n[ruLang].snackTaskUpdated,
        type: 'success',
      })
    );
  },
});

taskListenerMiddleWare.startListening({
  actionCreator: updateTask.rejected,
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
