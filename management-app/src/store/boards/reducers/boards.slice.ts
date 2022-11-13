import { createSlice } from '@reduxjs/toolkit';
import { createBoard, loadBoards } from '../thunks/loadBoards.thunk';
import { IBoardsState } from '../types/boardsState.type';

const initialState: IBoardsState = {
  boards: [],
  isLoading: false,
  error: '',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
      state.error = '';
    });
    builder.addCase(loadBoards.rejected, (state, action) => {
      state.isLoading = false;
      state.boards = [];
      state.error = action.error.message;
    });
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBoard.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
