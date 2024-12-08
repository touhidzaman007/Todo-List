import { useState } from 'react';
import { useTodoContext } from '../../contexts';

function TodoForm() {
  const [title, setTitle] = useState('');

  const { addTodo } = useTodoContext();

  const add = e => {
    e.preventDefault();

    if (!title) return;

    addTodo({ title, checked: false });
    setTitle('');
  };
  return (
    <form onSubmit={add} className='flex'>
      <input
        type='text'
        placeholder='Write Todo...'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-gray-900 dark:text-white'
      />
      <button
        type='submit'
        className='rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0'
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
