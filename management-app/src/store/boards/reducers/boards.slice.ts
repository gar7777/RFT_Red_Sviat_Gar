import { createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, loadBoards, updateBoard } from '../thunks/loadBoards.thunk';
import { IBoardsState } from '../types/boardsState.type';

const initialState: IBoardsState = {
  boards: [],
  isLoading: false,
  error: '',
  isEditing: false,
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
    builder.addCase(deleteBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBoard.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(updateBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
