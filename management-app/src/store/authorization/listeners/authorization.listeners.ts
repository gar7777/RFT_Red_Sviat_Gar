import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSnackBarIsOpen } from '../../snack/reducers/snack.slice';
import { signIn, signUp } from '../thunks/authorization.thunks';
import { i18n } from '../../../features/i18n';
import { getLangfromLS } from '../../../utilities/getLang';

export const authlistenerMiddleWare = createListenerMiddleware();

const lang = getLangfromLS();

authlistenerMiddleWare.startListening({
  actionCreator: signUp.fulfilled,
  effect: (_, listenerAPI) => {
    listenerAPI.dispatch(
      setSnackBarIsOpen({
        message: i18n[lang].snackSignUp,
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
        message: i18n[lang].snackError,
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
        message: i18n[lang].snackSignIn,
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
        message: i18n[lang].snackError,
        type: 'error',
      })
    );
  },
});
