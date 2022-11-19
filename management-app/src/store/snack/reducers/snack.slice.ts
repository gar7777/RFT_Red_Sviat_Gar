import { createSlice } from '@reduxjs/toolkit';
import { ISnackState } from '../types/snackState.type';

const initialState: ISnackState = {
  isOpen: false,
  allertMessage: '',
  allertType: 'success',
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    setSnackBarIsOpen: (state, action) => {
      return {
        ...state,
        isOpen: true,
        allertMessage: action.payload.message,
        allertType: action.payload.type,
      };
    },
    setSnackBarIsClose: () => initialState,
  },
});

export const { setSnackBarIsOpen, setSnackBarIsClose } = snackSlice.actions;
export default snackSlice.reducer;
