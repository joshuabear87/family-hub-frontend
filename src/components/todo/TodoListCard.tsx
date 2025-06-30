import React from 'react';
import { TodoList } from '../../types';

interface Props {
  list: TodoList;
  onClick: () => void;
}

const TodoListCard: React.FC<Props> = ({ list, onClick }) => {
  const displayedTodos = list.todos.slice(0, 3);
  const remainingCount = list.todos.length - displayedTodos.length;

  return (
    <div
      className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-2">{list.name}</h2>
      <ul>
        {displayedTodos.map((todo) => (
          <li key={todo._id} className="text-sm">
            - {todo.text}
          </li>
        ))}
      </ul>
      {remainingCount > 0 && (
        <p className="text-xs text-gray-500 mt-2">+{remainingCount} more items</p>
      )}
    </div>
  );
};

export default TodoListCard;
