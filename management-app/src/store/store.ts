import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authorization/auth.slice';
import boardsSlice from './boards/reducers/boards.slice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
