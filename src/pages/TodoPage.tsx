import React, { useState, useEffect } from "react";
import { TodoList } from "../types";
import TodoListCard from "../components/todo/TodoListCard";
import NewListInput from "../components/todo/NewListInput";
import ListDetailModal from "../components/todo/ListDetailPage";
import API from "../api/axios";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const TodoPage: React.FC = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/lists');
      setLists(data);
    } catch (err: any) {
      console.error("Failed to fetch lists:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const addList = async () => {
    if (!newListName.trim()) return;
    try {
      setLoading(true);
      const { data } = await API.post('/api/lists', { name: newListName.trim() });
      setLists([...lists, data]);
      setNewListName("");
      setShowNewListInput(false);
      setSelectedList(data); // open new list
    } catch (err: any) {
      console.error("Failed to create list:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleInput = () => {
    if (showNewListInput) setNewListName("");
    setShowNewListInput(!showNewListInput);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 py-5 relative">
      <h1 className="text-sm mb-4 text-center">Our Lists</h1>

      {/* + Button top-right */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleToggleInput}
          className="text-gray-700 hover:text-black transition"
          disabled={loading}
        >
          <Plus size={22} />
        </button>
      </div>

      {/* New List Input */}
      {showNewListInput && (
        <NewListInput
          newListName={newListName}
          setNewListName={setNewListName}
          addList={addList}
        />
      )}

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {lists.map((list) => (
          <TodoListCard
            key={list._id}
            list={list}
            onClick={() => setSelectedList(list)}
          />
        ))}
      </div>

      {/* List Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedList && (
          <ListDetailModal
            list={selectedList}
            onClose={() => setSelectedList(null)}
            refreshLists={fetchLists}
          />
        )}
      </AnimatePresence>

      {lists.length === 0 && !loading && (
        <p className="text-center text-sm text-gray-500 mt-4">No lists yet...</p>
      )}
    </div>
  );
};

export default TodoPage;
