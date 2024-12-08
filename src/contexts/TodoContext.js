/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

export const TodoContext = createContext({
  todos: [{ id: 1, title: 'First todo', checked: false }],
  addTodo: todo => {},
  updateTodo: (id, todo) => {},
  deleteTodo: id => {},
  toggleChekcbox: id => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodoContext = () => {
  return useContext(TodoContext);
};
