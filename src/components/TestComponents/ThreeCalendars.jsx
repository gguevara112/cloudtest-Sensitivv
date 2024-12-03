import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ThreeCalendars.css';

const ThreeCalendars = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getPreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth;
  };

  const getNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  };

  return (
    <div className="calendarContainer">
      <div className="calendar">
        <Calendar value={getPreviousMonth()} />
      </div>
      <div className="calendar">
        <Calendar value={currentDate} />
      </div>
      <div className="calendar">
        <Calendar value={getNextMonth()} />
      </div>
    </div>
  );
};

export default ThreeCalendars;
