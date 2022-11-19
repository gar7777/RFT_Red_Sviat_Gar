import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authorization/auth.slice';
import userSlice from './authorization/user.slice';
import boardsSlice from './boards/reducers/boards.slice';
import columnsSlice from './columns/reducers/columns.slice';
import snackSlice from './snack/reducers/snack.slice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    columns: columnsSlice,
    auth: authSlice,
    user: userSlice,
    snack: snackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
