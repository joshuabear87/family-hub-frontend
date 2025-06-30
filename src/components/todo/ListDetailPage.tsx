import React, { useState, useEffect } from 'react';
import { TodoList, Todo } from '../../types';
import API from '../../api/axios';
import { CheckCircle, Circle, Trash2, ArrowLeftCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  list: TodoList;
  onClose: () => void;
  refreshLists: () => Promise<void>;
}

const ListDetailPage: React.FC<Props> = ({ list, onClose, refreshLists }) => {
  const [todos, setTodos] = useState<Todo[]>(list.todos || []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTodos(list.todos || []);
  }, [list]);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const { data } = await API.post(`/api/lists/${list._id}/todos`, { text: input.trim() });
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
      const { data } = await API.put(`/api/todos/${todoId}`, { completed: !todo.completed });
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
      await Promise.all(checkedIds.map((id) => API.delete(`/api/todos/${id}`)));
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
      setDeleting(true);
      await new Promise(res => setTimeout(res, 500)); // wait for animation
      setLoading(true);
      await API.delete(`/api/lists/${list._id}`);
      await refreshLists();
      onClose();
    } catch (err: any) {
      console.error('Failed to delete list:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={deleting ? { scale: 0.5, rotate: 15, opacity: 0 } : { x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg lined-paper overflow-y-auto px-4 py-8"
    >
      <button
        onClick={onClose}
        className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
      >
        <ArrowLeftCircle size={20} />
      </button>

      <h2 className="text-sm font-semibold mb-3 text-center">{list.name}</h2>

      <div className="flex items-center space-x-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTodo();
            }
          }}
          placeholder="Add new to-do"
          className="text-xs border rounded px-2 py-1 w-full outline-none"
          disabled={loading}
        />
      </div>

      <ul className="space-y-1">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleComplete(todo._id)}
              className={`flex items-center text-[10px] border-b border-dashed border-gray-300 pb-1 cursor-pointer`}
            >
              {todo.completed ? (
                <CheckCircle size={14} className="mr-1 text-green-600" />
              ) : (
                <Circle size={14} className="mr-1 text-black" />
              )}
              <span className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex justify-between mt-4 space-x-2">
        <button
          onClick={deleteCheckedTodos}
          className="flex items-center justify-center bg-red-600 text-white text-[10px] px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50 w-1/2"
          disabled={loading}
        >
          <Trash2 size={12} className="mr-1" /> Delete Checked
        </button>
        <button
          onClick={deleteList}
          className="flex items-center justify-center bg-red-800 text-white text-[10px] px-2 py-1 rounded hover:bg-red-900 disabled:opacity-50 w-1/2"
          disabled={loading}
        >
          <Trash2 size={12} className="mr-1" /> Delete List
        </button>
      </div>
    </motion.div>
  );
};

export default ListDetailPage;
