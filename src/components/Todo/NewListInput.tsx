import React from "react";

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
  <div className="flex mb-8">
    <input
      type="text"
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") addList();
      }}
      placeholder="New list name"
      className="flex-grow border rounded px-3 py-2"
    />
  </div>
);

export default NewListInput;
