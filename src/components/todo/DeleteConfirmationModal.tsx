import React from "react";
import { Trash2, XCircle } from "lucide-react";

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
    <div className="bg-white rounded shadow-lg p-4 w-72 text-center">
      <Trash2 size={24} className="mx-auto text-red-600 mb-2" />
      <h3 className="text-sm font-semibold mb-2">Confirm Delete</h3>
      <p className="text-xs mb-3">Are you sure you want to delete this list?</p>
      <div className="flex justify-center space-x-2">
        <button
          onClick={onCancel}
          className="flex items-center justify-center px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-[10px]"
        >
          <XCircle size={12} className="mr-1" /> Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center justify-center px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-[10px]"
        >
          <Trash2 size={12} className="mr-1" /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
