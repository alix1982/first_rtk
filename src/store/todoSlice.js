import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk (
  'todos/fetchTodos',
  async function (_, {rejectWithValue}) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    try {
      if (!response.ok) {
        throw new Error('Server error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
    
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodos',
  async function (id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Deletion error on the Server!')
      }
      dispatch(removeTodo({id}));
  } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async function(id, {rejectWithValue, dispatch, getState}) {
    
    const todo = getState().todos.todos.find( todo => todo.id === id );

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      });

      if (!response.ok) {
        throw new Error('Toggle error on the Server!')
      }

      dispatch(toggleTodoComplited({id}));

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addTodoFetch = createAsyncThunk(
  'todos/addTodoFetch',
  async function(text, {rejectWithValue, dispatch}) {
    
    const todo = {
      userId: 1,
      title: text,
      completed: false
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
      });

      if (!response.ok) {
        throw new Error('Add error on the Server!')
      }

      const data = await response.json();
      dispatch(addTodo(data));

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo (state, action) {
      state.todos.push(action.payload)
    },
    removeTodo (state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    toggleTodoComplited (state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
      // state.todos = state.todos.map((todo) => (todo.id === action.payload.id) ? (todo.complited = {...todo, complited: !todo.complited}) : (todo))
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleTodo.rejected]: setError,
  },
});

const {addTodo, removeTodo, toggleTodoComplited} = todoSlice.actions;
export default todoSlice.reducer;