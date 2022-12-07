import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { signIn, signUp } from '../thunks/authorization.thunks';
import { i18n } from '../../../features/i18n';
import { enLang, ruLang } from '../../../utilities/getLang';

export const authlistenerMiddleWare = createListenerMiddleware();

authlistenerMiddleWare.startListening({
  actionCreator: signUp.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackSignUp,
        ruMessage: i18n[ruLang].snackSignUp,
        type: 'success',
      })
    );
  },
});

authlistenerMiddleWare.startListening({
  actionCreator: signUp.rejected,
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

authlistenerMiddleWare.startListening({
  actionCreator: signIn.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        enMessage: i18n[enLang].snackSignIn,
        ruMessage: i18n[ruLang].snackSignIn,
        type: 'success',
      })
    );
  },
});

authlistenerMiddleWare.startListening({
  actionCreator: signIn.rejected,
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
