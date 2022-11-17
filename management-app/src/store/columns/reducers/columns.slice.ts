import { createSlice } from '@reduxjs/toolkit';
import { createColumn, deleteColumn, loadColumns } from '../thunks/columns.thunks';
// import { IBoardsState } from '../types/boardsState.type';

interface IColumn {
  id: string;
  title: string;
  description: string;
}

interface IColumnsState {
  columns: IColumn[];
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  currentBoard: string;
}

const initialState: IColumnsState = {
  columns: [],
  isLoading: false,
  error: '',
  isEditing: false,
  currentBoard: '',
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadColumns.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadColumns.fulfilled, (state, action) => {
      state.isLoading = false;
      state.columns = action.payload;
      state.error = '';
    });
    builder.addCase(loadColumns.rejected, (state, action) => {
      state.isLoading = false;
      state.columns = [];
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(createColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createColumn.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(createColumn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColumn.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    // builder.addCase(updateColumn.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateColumn.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.error = '';
    // });
    // builder.addCase(updateColumn.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // });
  },
});

export const {} = columnsSlice.actions;
export default columnsSlice.reducer;
