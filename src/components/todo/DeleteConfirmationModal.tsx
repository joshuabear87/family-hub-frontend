import React from "react";

interface DeleteConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onCancel,
  onConfirm,
}) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="bg-white rounded shadow-lg p-6 w-80">
      <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
      <p className="mb-4">Are you sure you want to delete this list?</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
