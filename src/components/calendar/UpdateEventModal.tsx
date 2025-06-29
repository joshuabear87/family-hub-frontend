import React, { useState } from 'react';
import API from '../../api/axios';

interface Props {
  event: any;
  onClose: () => void;
  refreshEvents: () => void;
}

const UpdateEventModal: React.FC<Props> = ({ event, onClose, refreshEvents }) => {
  const [title, setTitle] = useState(event.title);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await API.put(`/events/${event._id}`, { title });
      refreshEvents();
      onClose();
    } catch (err: any) {
      console.error('Failed to update event:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this event?')) return;

    try {
      setLoading(true);
      await API.delete(`/events/${event._id}`);
      refreshEvents();
      onClose();
    } catch (err: any) {
      console.error('Failed to delete event:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Event</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateEventModal;
