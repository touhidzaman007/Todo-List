import { ThemeBtn, TodoForm, TodoItem } from './components';
import { ThemeContextProvider, TodoContextProvider } from './contexts';
import { useEffect, useState } from 'react';

function App() {
  // Work on Theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const lightMode = () => {
    setTheme('light');
  };

  const darkMode = () => {
    setTheme('dark');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Work on Todo List
  const [todos, setTodos] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    setTodos(prev => [...prev, { ...todo, id: Date.now() }]);
  };

  const updateTodo = (id, todo) => {
    setTodos(prev =>
      prev.map(prevTodo => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(prevTodo => prevTodo.id !== id));
  };

  const toggleChekcbox = id => {
    setTodos(prev =>
      prev.map(prevTodo =>
        prevTodo.id === id
          ? { ...prevTodo, checked: !prevTodo.checked }
          : prevTodo
      )
    );
  };

  return (
    <ThemeContextProvider value={{ theme, lightMode, darkMode }}>
      <TodoContextProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleChekcbox }}
      >
        <div className='w-full bg-[#F9F6EE] dark:bg-[#172842] min-h-screen py-8'>
          <div className='w-full max-w-2xl mx-auto shadow-lg rounded-lg py-6 px-8 text-white bg-gray-200 dark:bg-[#233b5e]'>
            <h1 className='text-2xl font-bold text-center mb-8 mt-2 text-gray-900 dark:text-white flex item-center justify-between'>
              Manage Your Todos
              <ThemeBtn />
            </h1>
            <div className='mb-4'>
              <TodoForm />
            </div>
            <div className='flex flex-wrap gap-y-3'>
              {todos.map(todo => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
