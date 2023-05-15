import React, { useState, useEffect } from 'react';
import { BsCalendarCheck } from 'react-icons/bs'

const Week = ({date}:{date:Date}) => {
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    setSelectedDate(date)
  },[date]);


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



  return (
    <div className="week-calendar bg-white rounded-lg shadow-lg">
      <div className="week-days grid grid-cols-7">
        {renderWeekDays()}
      </div>
    </div>
  );
};

export default Week;