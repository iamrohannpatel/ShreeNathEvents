import React from 'react';

export const Calendar = ({ selected, onSelect }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = [];
  const totalDays = daysInMonth(currentMonth, currentYear);
  
  // Previous month days
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
  }
  
  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isSelected = selected && 
                      date.getDate() === selected.getDate() && 
                      date.getMonth() === selected.getMonth() && 
                      date.getFullYear() === selected.getFullYear();
    
    days.push(
      <button
        key={day}
        onClick={() => onSelect(date)}
        className={`h-10 w-10 rounded-full flex items-center justify-center ${
          isSelected 
            ? 'bg-blue-600 text-white' 
            : 'hover:bg-gray-100'
        }`}
      >
        {day}
      </button>
    );
  }
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          &larr;
        </button>
        <h3 className="font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          &rarr;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};
