import React, { useState, useEffect } from "react";
import { TodoList } from "../types";
import TodoListCard from "../components/todo/TodoListCard";
import { FaPlus } from "react-icons/fa";
import NewListInput from "../components/todo/NewListInput";
import ListDetailModal from "../components/todo/ListDetailPage";
import API from "../api/axios";

const TodoPage: React.FC = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/lists');
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
      const { data } = await API.post('/lists', { name: newListName.trim() });
      setLists([...lists, data]);
      setNewListName("");
      setShowNewListInput(false);
      setSelectedList(data); // Open detail modal for new list
    } catch (err: any) {
      console.error("Failed to create list:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 py-5">
      <h1 className="text-3xl mb-4 text-center">Our Lists</h1>

      {/* + Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setShowNewListInput(true)}
          className="text-green-600 shadow-md text-2xl px-2 py-2 rounded-full hover:bg-green-200"
          disabled={loading}
        >
          <FaPlus />
        </button>
      </div>

      {/* New List Modal */}
      {showNewListInput && (
        <NewListInput
          newListName={newListName}
          setNewListName={setNewListName}
          addList={addList}
        />
      )}

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lists.map((list) => (
          <TodoListCard
            key={list._id}
            list={list}
            onClick={() => setSelectedList(list)}
          />
        ))}
      </div>

      {/* List Detail Modal */}
      {selectedList && (
        <ListDetailModal
          list={selectedList} // ✅ Pass list prop here
          onClose={() => setSelectedList(null)}
          refreshLists={fetchLists}
        />
      )}

      {lists.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">No lists yet.</p>
      )}
    </div>
  );
};

export default TodoPage;
