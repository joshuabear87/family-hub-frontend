import React from 'react';

interface Props {
  date: string;
  events: any[];
  onClose: () => void;
  onTimeSlotClick: (time: string) => void;
}

const DayViewModal: React.FC<Props> = ({ date, events, onClose, onTimeSlotClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-full max-w-lg max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Appointments for {date}</h2>

        <div className="mb-4">
          {events.length === 0 && (
            <p className="text-gray-500">No events scheduled for this day.</p>
          )}
          {events.map((event) => (
            <div key={event.id} className="mb-2 border rounded p-2">
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm">{event.start} - {event.end}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">Add New Event:</h3>
        <div className="grid grid-cols-4 gap-2">
          {hours.map((hour) => {
            const timeStr = `${date}T${hour.toString().padStart(2, '0')}:00:00`;
            return (
              <button
                key={hour}
                onClick={() => onTimeSlotClick(timeStr)}
                className="border rounded px-2 py-1 hover:bg-green-100"
              >
                {hour}:00
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DayViewModal;
