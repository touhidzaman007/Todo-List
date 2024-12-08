import { useTodoContext } from '../../contexts';
import { useState } from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.title);

  const { updateTodo, deleteTodo, toggleChekcbox } = useTodoContext();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleChecked = () => {
    toggleChekcbox(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-white ${
        todo.checked ? 'bg-[#9694FF]' : 'bg-[#0D92F4]'
      }`}
    >
      <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.checked}
        onChange={toggleChecked}
      />
      <input
        type='text'
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
        } ${todo.checked ? 'line-through' : ''}`}
        value={todoMsg}
        onChange={e => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => {
          if (todo.checked) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable(prev => !prev);
        }}
        disabled={todo.checked}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      {/* Delete Todo Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 text-red-500'
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
};

export default TodoItem;
