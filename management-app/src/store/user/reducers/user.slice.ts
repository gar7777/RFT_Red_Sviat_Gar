import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, updateUser } from '../thunks/loadUser.thunks';
import { IUserState } from '../types/types';

const initialState: IUserState = {
  user: {
    name: '',
    login: '',
    password: '',
  },
  isLoading: false,
  error: '',
  isEditing: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
