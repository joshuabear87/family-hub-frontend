import React, { useState, useEffect, useRef } from 'react';
import MonthGrid from '../components/calendar/MonthGrid';
import AgendaView from '../components/calendar/AgendaView';

const CalendarPage: React.FC = () => {
  const [months, setMonths] = useState<Date[]>([]);
  const [agendaView, setAgendaView] = useState(false);
  const [currentMonthLabel, setCurrentMonthLabel] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    setMonths([today]);
    setCurrentMonthLabel(today.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight + 200) {
        const monthDate = months[i];
        const label = monthDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
        setCurrentMonthLabel(label);
        break;
      }
    }

    // Load next month if near bottom
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 300) {
      const lastMonth = months[months.length - 1];
      const nextMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1);
      // Prevent duplicates
      if (!months.find(m => m.getMonth() === nextMonth.getMonth() && m.getFullYear() === nextMonth.getFullYear())) {
        setMonths([...months, nextMonth]);
      }
    }
  };

  const loadPastMonth = () => {
    const firstMonth = months[0];
    const prevMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1, 1);
    setMonths([prevMonth, ...months]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h2 className="text-lg font-bold text-center mb-2">{currentMonthLabel}</h2>

        <div className="flex justify-center space-x-4 mb-2">
          <button
            onClick={() => setAgendaView(false)}
            className={`px-4 py-2 rounded ${!agendaView ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Month View
          </button>
          <button
            onClick={() => setAgendaView(true)}
            className={`px-4 py-2 rounded ${agendaView ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Agenda View
          </button>
        </div>

        <button
          onClick={loadPastMonth}
          className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          View Previous Month
        </button>
      </div>

      {/* Views */}
      <div className="flex-1 bg-gray-50 overflow-y-auto" ref={containerRef} onScroll={handleScroll}>
        {agendaView ? (
          <AgendaView setCurrentMonthLabel={setCurrentMonthLabel} />
        ) : (
          months.map((month, idx) => (
            <div key={idx} className="border-b">
              <MonthGrid date={month} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
