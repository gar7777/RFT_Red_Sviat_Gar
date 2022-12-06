import { createSlice } from '@reduxjs/toolkit';
import { ISnackState } from '../types/snackState.type';

const initialState: ISnackState = {
  isOpen: false,
  enMessage: '',
  ruMessage: '',
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
        enMessage: action.payload.enMessage,
        ruMessage: action.payload.ruMessage,
        allertType: action.payload.type,
      };
    },
    setSnackBarIsClose: () => initialState,
  },
});

export const { setSnackBarIsOpen, setSnackBarIsClose } = snackSlice.actions;
export default snackSlice.reducer;
