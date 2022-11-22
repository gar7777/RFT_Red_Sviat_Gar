import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authorization/reducers/auth.slice';
import { boardlistenerMiddleWare } from './boards/listeners/listeners.boards';
import boardsSlice from './boards/reducers/boards.slice';
import columnsSlice from './columns/reducers/columns.slice';
import tasksSlice from './tasks/reducers/tasks.slice';
import snackSlice from './snack/reducers/snack.slice';
import userSlice from './user/reducers/user.slice';
import langSlice from './i18n/reducers/lang.slice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    columns: columnsSlice,
    tasks: tasksSlice,
    auth: authSlice,
    user: userSlice,
    snack: snackSlice,
    lang: langSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(boardlistenerMiddleWare.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
