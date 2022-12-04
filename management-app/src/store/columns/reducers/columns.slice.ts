import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../boards/types/boards.type';
import { ILoadedColumnTasks } from '../../tasks/types/tasks.types';
import {
  createColumn,
  deleteColumn,
  getColumnTasks,
  loadColumns,
  updateColumn,
} from '../thunks/columns.thunks';
import { IColumnState, ILoadedColumn } from '../types/columns.type';

interface IColumnsState {
  columns: IColumnState[];
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  currentColumn: ILoadedColumn | null;
  currentTasks: ILoadedColumnTasks[];
}

const initialState: IColumnsState = {
  columns: [],
  isLoading: false,
  error: '',
  isEditing: false,
  currentColumn: null,
  currentTasks: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setCurrentColumn(state, action) {
      state.currentColumn = action.payload;
    },
    resetColumns(state) {
      state.columns = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadColumns.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadColumns.fulfilled, (state, action) => {
      state.isLoading = false;
      state.columns = action.payload;
      state.error = '';
    });
    builder.addCase(getColumnTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.columns = [];
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(getColumnTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getColumnTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentTasks = [...state.currentTasks, action.payload];
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
    builder.addCase(updateColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateColumn.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(updateColumn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
  },
});

export const { setCurrentColumn, resetColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
