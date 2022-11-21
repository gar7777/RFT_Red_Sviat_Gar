import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { createTask, deleteTask, updateTask } from '../thunks/tasks.thunks';

export const taskListenerMiddleWare = createListenerMiddleware();

taskListenerMiddleWare.startListening({
  actionCreator: createTask.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: 'task is created',
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
        message: 'something went wrong',
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
        message: 'something went wrong',
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
        message: 'something went wrong',
        type: 'error',
      })
    );
  },
});
