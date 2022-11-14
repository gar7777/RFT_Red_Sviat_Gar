import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userToken: string;
}

const initAuthState: AuthState = {
  userToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    loginUser(state, action: { payload: string }) {
      state.userToken = action.payload;
    },
    logoutUser(state) {
      state.userToken = '';
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
