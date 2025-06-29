import React, { useState } from 'react';
import API from '../api/axios';

interface Props {
  date: string;
  dayEvents: any[];
  onClose: () => void;
  refreshEvents: () => void;
}

const CreateEventModal: React.FC<Props> = ({ date, dayEvents, onClose, refreshEvents }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(date);
  const [end, setEnd] = useState(date);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !start || !end) {
      alert('Fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await API.post('/events', { title, start, end });
      refreshEvents();
      onClose();
    } catch (err: any) {
      console.error('Failed to create event:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end z-50">
      <div className="bg-white w-full rounded-t-lg p-4 max-h-[80%] overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Events on {new Date(date).toDateString()}</h2>

        {dayEvents.length === 0 ? (
          <p className="text-gray-500 mb-4">No events yet.</p>
        ) : (
          <ul className="mb-4">
            {dayEvents.map((event) => (
              <li key={event._id} className="border-b py-2">{event.title}</li>
            ))}
          </ul>
        )}

        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <div className="flex justify-between space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
