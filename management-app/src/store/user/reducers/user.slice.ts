import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, loadUser, loadUsers, updateUser } from '../thunks/loadUser.thunks';
import { IUserState } from '../types/user.types';

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    login: '',
    password: '',
  },
  isLoading: false,
  error: '',
  isEditing: false,
  users: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setEmptyUser() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loadUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
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
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setEmptyUser } = userSlice.actions;
export default userSlice.reducer;
