import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleImportant, toggleEditing, saveEdit } from '../store/todoSlice';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue('');
    }
  };

  return (
    <div>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Добавить todo" />
      <button onClick={handleAddTodo}>Добавить</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ color: todo.important ? 'red' : 'black' }}>
            {todo.isEditing ? (
              <>
                <input
                  value={todo.text}
                  onChange={e => dispatch(toggleEditing({ id: todo.id, text: e.target.value }))}
                />
                <button onClick={() => dispatch(saveEdit({ id: todo.id, text: todo.text }))}>Сохранить</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => dispatch(toggleImportant(todo.id))}>Важно</button>
                <button onClick={() => dispatch(toggleEditing({ id: todo.id, text: todo.text }))}>Изменить</button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
