import { useState, useEffect } from 'react';

const Timeline = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
  }

  function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();
  }

  function handleDateChange(newDate) {
    setSelectedDate(newDate);
  }

  function handleScroll(e) {
    const newDate = new Date(selectedDate);

    if (e.deltaY > 0) {
      // Scroll down
      newDate.setDate(newDate.getDate() + 1);
    } else {
      // Scroll up
      newDate.setDate(newDate.getDate() - 1);
    }

    setSelectedDate(newDate);
  }

  const dates = [
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1),
    selectedDate,
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1)
  ];

  return (
    <div className="timeline" onWheel={handleScroll}>
      {dates.map(date => (
        <div key={date.toDateString()} className={`timeline__date ${isToday(date) ? 'today' : ''}`} onClick={() => handleDateChange(date)}>
          <p className="timeline__date-label">{formatDate(date)}</p>
        </div>
      ))}
    </div>
  );
}

export default Timeline;

