import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const initialState: { data: Todo[] } = {
  data: [],
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
});

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (todoId: number) => {
    try {
      await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'PUT',
      });
      return todoId;
    } catch (error) {
      console.error('Error toggling todo completion:', error);
      throw error;
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState.data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(toggleTodoComplete.fulfilled, (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
  },
});

export default todosSlice.reducer;
