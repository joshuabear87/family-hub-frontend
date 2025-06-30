import React from 'react';
import { TodoList } from '../../types';
import { ListTodo } from 'lucide-react';

interface Props {
  list: TodoList;
  onClick: () => void;
}

const TodoListCard: React.FC<Props> = ({ list, onClick }) => {
  const displayedTodos = list.todos.slice(0, 3);
  const remainingCount = list.todos.length - displayedTodos.length;

  return (
    <div
      className="bg-white shadow rounded px-3 py-2 cursor-pointer hover:bg-gray-50 transition w-full"
      onClick={onClick}
    >
      <div className="flex items-center mb-1">
        <ListTodo size={14} className="text-gray-500 mr-1" />
        <h2 className="text-sm font-semibold truncate">{list.name}</h2>
      </div>
      <ul className="space-y-0.5">
        {displayedTodos.map((todo) => (
          <li key={todo._id} className="text-[10px] text-gray-700">
            - {todo.text}
          </li>
        ))}
      </ul>
      {remainingCount > 0 && (
        <p className="text-[9px] text-gray-400 mt-1">+{remainingCount} more items</p>
      )}
    </div>
  );
};

export default TodoListCard;
