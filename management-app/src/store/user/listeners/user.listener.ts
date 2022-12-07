import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { updateUser, deleteUser } from '../thunks/loadUser.thunks';
import { i18n } from '../../../features/i18n';
import { enLang, ruLang } from '../../../utilities/getLang';

export const userlistenerMiddleWare = createListenerMiddleware();

userlistenerMiddleWare.startListening({
  actionCreator: updateUser.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackProfileUpdated,
        ruMessage: i18n[ruLang].snackProfileUpdated,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
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
        enMessage: i18n[enLang].snackProfileDeleted,
        ruMessage: i18n[ruLang].snackProfileDeleted,
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
        enMessage: i18n[enLang].snackError,
        ruMessage: i18n[ruLang].snackError,
        type: 'error',
      })
    );
  },
});
