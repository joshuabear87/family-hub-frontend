import React from "react";
import { Plus } from "lucide-react";

interface NewListInputProps {
  newListName: string;
  setNewListName: (value: string) => void;
  addList: () => void;
}

const NewListInput: React.FC<NewListInputProps> = ({
  newListName,
  setNewListName,
  addList,
}) => (
  <div className="flex items-center space-x-2 mb-4 w-full max-w-xs">
    <input
      type="text"
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") addList();
      }}
      placeholder="New list name"
      className="text-xs border rounded px-2 py-1 w-full outline-none"
    />
    <button
      onClick={addList}
    >
      <Plus size={18} />
    </button>
  </div>
);

export default NewListInput;
