import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, important: false, isEditing: false });
    },
    removeTodo: (state, action) => state.filter(todo => todo.id !== action.payload),
    toggleImportant: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.important = !todo.important;
    },
    toggleEditing: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.isEditing = !todo.isEditing;
        if (todo.isEditing) todo.text = action.payload.text; 
      }
    },
    saveEdit: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.isEditing = false;
      }
    }
  }
});

export const { addTodo, removeTodo, toggleImportant, toggleEditing, saveEdit } = todoSlice.actions;
export default todoSlice.reducer;