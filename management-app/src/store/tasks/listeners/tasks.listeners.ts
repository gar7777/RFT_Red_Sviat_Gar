import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createTask, deleteTask, updateTask } from '../thunks/tasks.thunks';
import { i18n } from '../../../features/i18n';
import { getLangfromLS } from '../../../utilities/getLang';

export const taskListenerMiddleWare = createListenerMiddleware();

const lang = getLangfromLS();

taskListenerMiddleWare.startListening({
  actionCreator: createTask.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackTaskCreated,
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
        message: i18n[lang].snackError,
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
        message: 'task was deleted',
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
        message: i18n[lang].snackError,
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
        message: 'task was updated',
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
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});
