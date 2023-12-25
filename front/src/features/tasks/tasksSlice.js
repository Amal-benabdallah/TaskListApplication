import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching tasks
export const fetchTasksAction = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {

    const response = await fetch('http://localhost:5000/api/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const tasks = await response.json();
    return tasks;
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Reducer to add a task
    addTaskAction: (state, action) => {
      state.tasks.push(action.payload);
    },
    // Reducer to delete a task
    deleteTaskAction: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // Reducer to update a task
    updateTaskAction: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { addTaskAction, deleteTaskAction, updateTaskAction } = tasksSlice.actions;

export default tasksSlice.reducer;
