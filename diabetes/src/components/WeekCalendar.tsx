import React, { useState } from 'react';
import { BsCalendarCheck } from 'react-icons/bs'

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderWeekDays = () => {
    const days = [];
    const dayOfWeek = selectedDate.getDay();
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - dayOfWeek);
    const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - dayOfWeek + 6);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const selected = day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

      days.push(
        <div className={`day`} key={`${year}-${month}-${day}`}>
          <div className="day-of-week border">{getDayOfWeek(date.getDay())}</div>
          <div className='border'>
            <div className='flex gap-1'>
              <div className={`day-number w-6 ${selected ? 'rounded-full bg-blue-200' : ''}`}>
                {day === 1 ? `${month + 1}/${day}` : day}
              </div>
              {isToday && <div className='flex justify-center items-center'><BsCalendarCheck></BsCalendarCheck></div>}
            </div>
            <div className='h-16'></div>
          </div>
        </div>
      );
    }

    return days;
  };

  const getDayOfWeek = (dayOfWeek:number) => {
    switch (dayOfWeek) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return '';
    }
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="week-calendar bg-white rounded-lg shadow-lg">
      <div className="header flex justify-between p-4 border-b">
        <button onClick={handlePrevDay}>Prev</button>
        <div className="week-label font-medium">
          Week of {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="date-picker">
          <label htmlFor="selected-date" className="font-medium mr-2">
            Selected date:
          </label>
          <input type="date" id="selected-date" className="border rounded-lg p-2" value={new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)} onChange={(event) => setSelectedDate(new Date(event.target.value))} />        </div>
        <button onClick={handleNextDay}>Next</button>
        {/* <div className="navigation-buttons">
        </div> */}
      </div>
      {/* <div className="days-of-week grid grid-cols-7 text-center text-sm font-medium p-4 border-b">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div> */}
      <div className="week-days grid grid-cols-7">
        {renderWeekDays()}
      </div>
    </div>
  );
};

export default WeekCalendar;