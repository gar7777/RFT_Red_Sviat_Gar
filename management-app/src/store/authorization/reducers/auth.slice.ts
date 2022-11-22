import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromLS, setTokenToLS } from '../../../utilities/getToken';
import { signUp, signIn } from '../thunks/authorization.thunks';

interface AuthState {
  userToken: string;
  isLoading: boolean;
  error?: string;
  isEditing: boolean;
}

const initAuthState: AuthState = {
  userToken: getTokenFromLS() as string,
  isLoading: false,
  error: '',
  isEditing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    loginUser(state) {
      setTokenToLS(state.userToken);
    },
    logoutUser(state) {
      state.userToken = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userToken = action.payload;
      state.isLoading = false;
      state.error = '';
      setTokenToLS(action.payload.token);
      console.log(JSON.stringify(action.payload.token));
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
