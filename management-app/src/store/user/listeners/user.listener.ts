import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { updateUser, deleteUser } from '../thunks/loadUser.thunks';
import { i18n } from '../../../features/i18n';
import { getLangfromLS } from '../../../utilities/getLang';

export const userlistenerMiddleWare = createListenerMiddleware();

const lang = getLangfromLS();

userlistenerMiddleWare.startListening({
  actionCreator: updateUser.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackProfileUpdated,
        type: 'success',
      })
    );
  },
});

userlistenerMiddleWare.startListening({
  actionCreator: updateUser.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});

userlistenerMiddleWare.startListening({
  actionCreator: deleteUser.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackProfileDeleted,
        type: 'success',
      })
    );
  },
});

userlistenerMiddleWare.startListening({
  actionCreator: deleteUser.rejected,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});
