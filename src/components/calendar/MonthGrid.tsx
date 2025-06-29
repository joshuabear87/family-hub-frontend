import React from 'react';

interface Props {
  date: Date;
}

const MonthGrid: React.FC<Props> = ({ date }) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const blankDays = Array(firstDayIndex).fill(null);

  return (
    <div className="p-4 bg-white min-h-[600px]"> {/* Ensures enough height */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}

        {blankDays.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => (
          <div
            key={i}
            className="border h-16 flex items-center justify-center cursor-pointer hover:bg-green-100"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;
