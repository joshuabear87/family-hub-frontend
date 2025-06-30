import React, { useState, useEffect } from 'react';
import { TodoList, Todo } from '../../types';
import API from '../../api/axios';

interface Props {
  list: TodoList;
  onClose: () => void;
  refreshLists: () => Promise<void>;
}

const ListDetailPage: React.FC<Props> = ({ list, onClose, refreshLists }) => {
  const [todos, setTodos] = useState<Todo[]>(list.todos || []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTodos(list.todos || []);
  }, [list]);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const { data } = await API.post(`/lists/${list._id}/todos`, { text: input.trim() });
      setTodos([...todos, data]);
      setInput('');
      await refreshLists();
    } catch (err: any) {
      console.error('Failed to create todo:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (todoId: string) => {
    const todo = todos.find((t) => t._id === todoId);
    if (!todo) return;
    try {
      setLoading(true);
      const { data } = await API.put(`/todos/${todoId}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === todoId ? data : t)));
      await refreshLists();
    } catch (err: any) {
      console.error('Failed to update todo:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCheckedTodos = async () => {
    try {
      setLoading(true);
      const checkedIds = todos.filter((t) => t.completed).map((t) => t._id);
      await Promise.all(checkedIds.map((id) => API.delete(`/todos/${id}`)));
      setTodos(todos.filter((t) => !t.completed));
      await refreshLists();
    } catch (err: any) {
      console.error('Failed to delete checked todos:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteList = async () => {
    try {
      setLoading(true);
      await API.delete(`/lists/${list._id}`);
      await refreshLists();
      onClose();
    } catch (err: any) {
      console.error('Failed to delete list:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white overflow-auto z-50 px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">{list.name}</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add new to-do"
        className="w-full border rounded px-3 py-2 mb-4"
        disabled={loading}
      />

      <ul className="mb-4">
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
              className="mr-2"
              disabled={loading}
            />
            <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mb-4">
        <button
          onClick={deleteCheckedTodos}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          disabled={loading}
        >
          Delete Checked Items
        </button>
        <button
          onClick={deleteList}
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 disabled:opacity-50"
          disabled={loading}
        >
          Delete List
        </button>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Back to Lists
      </button>
    </div>
  );
};

export default ListDetailPage;
