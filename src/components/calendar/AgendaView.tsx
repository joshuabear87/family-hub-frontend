import React, { useEffect, useRef } from 'react';

interface Props {
  setCurrentMonthLabel: (label: string) => void;
}

const AgendaView: React.FC<Props> = ({ setCurrentMonthLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const days = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight + 200) {
        const dayDate = days[i];
        const label = dayDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
        setCurrentMonthLabel(label);
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto p-4 bg-white"
    >
      {days.map((day, idx) => (
        <div key={idx} className="border-b py-2">
          <h3 className="font-bold">{day.toDateString()}</h3>
          <p className="text-gray-500">No events scheduled</p>
        </div>
      ))}
    </div>
  );
};

export default AgendaView;
