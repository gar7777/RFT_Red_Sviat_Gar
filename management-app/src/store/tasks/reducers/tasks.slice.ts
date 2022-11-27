import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, loadTasks, updateTask } from '../thunks/tasks.thunks';

interface ILoadTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: [];
}

interface IUpdateTask {
  id: string;
  title: string;
  description: string;
}

// interface IStateTask {
//   columnId: string;
//   tasks: ILoadTask[];
// }

interface ITasksState {
  tasks: ILoadTask[];
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  currentTask: IUpdateTask | null;
}

const initialState: ITasksState = {
  tasks: [],
  isLoading: false,
  error: '',
  isEditing: false,
  currentTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
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
    builder.addCase(createTask.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(updateTask.fulfilled, (state) => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error ocurred';
    });
  },
});

export const { setCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;
