import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, getAllTasks, loadTasks, updateTask } from '../thunks/tasks.thunks';
import { ILoadedColumnTasks, ITaskFull, IUpdateTaskData } from '../types/tasks.types';

interface ITasksState {
  isLoading: boolean;
  error: string;
  currentTask: IUpdateTaskData | null;
  createdTask: ITaskFull | null;
  tasks: ILoadedColumnTasks[];
}

const initialState: ITasksState = {
  tasks: [],
  isLoading: false,
  error: '',
  currentTask: null,
  createdTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
    resetTasks(state) {
      state.tasks = [];
    },
    updateColumnTasks(state, action) {
      const newState = [...state.tasks];
      const { columnId, tasks } = action.payload;
      const [updatedColumn] = newState.filter((column) => column.id === columnId);
      updatedColumn.tasks = tasks;
      state.tasks = newState;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.error = '';
    });
    builder.addCase(loadTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.tasks = [];
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const newState = [...state.tasks];
      const { columnId } = action.payload;
      const [deletedColumn] = newState.filter((column) => column.id === columnId);
      const deletedColumnIndex = newState.indexOf(deletedColumn);
      newState.splice(deletedColumnIndex, 1);
      state.tasks = newState;
      state.createdTask = action.payload;
      state.error = '';
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const newState = [...state.tasks];
      const { columnId } = action.payload;
      const [deletedColumn] = newState.filter((column) => column.id === columnId);
      const deletedColumnIndex = newState.indexOf(deletedColumn);
      newState.splice(deletedColumnIndex, 1);
      state.tasks = newState;
      state.error = '';
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const newState = [...state.tasks];
      const { columnId, id } = action.payload;
      const [updatedColumn] = newState.filter((column) => column.id === columnId);
      const [updatedTask] = updatedColumn.tasks.filter((task) => task.id === id);
      const updatedTaskIndex = updatedColumn.tasks.indexOf(updatedTask);
      updatedColumn.tasks.splice(updatedTaskIndex, 1, action.payload);
      state.tasks = newState;
      state.error = '';
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(getAllTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.tasks = [];
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(getAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      const newState = [...state.tasks];
      const { id } = action.payload;
      const [deletedColumn] = newState.filter((column) => column.id === id);
      if (deletedColumn) {
        const index = newState.indexOf(deletedColumn);
        newState.splice(index, 1);
      }
      state.tasks = [...newState, action.payload];
      state.error = '';
    });
  },
});

export const { setCurrentTask, resetTasks, updateColumnTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
