import React, { useState, useEffect } from 'react';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'

const Datepicker = ({date, onDateChange} : {date: Date, onDateChange: (date: Date) => void;}) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  useEffect(() => {
    setSelectedDate(date);
  },[]);

  return (
    <div className="header flex justify-center gap-6 p-4 border-b mb-6">
      <button className="previous-month text-2xl text-blue-800" onClick={handlePrevDay}>
        <BiCaretLeft></BiCaretLeft>
      </button>
      <div className="date-picker">
        <label htmlFor="selected-date" className="font-medium mr-2">
          Selected date:
        </label>
        <input 
          type="date" 
          id="selected-date" 
          onChange={(event) =>{ 
            setSelectedDate(new Date(event.target.value));
            onDateChange(new Date(event.target.value));
          }} 
          className="border rounded-lg p-2" 
          value={new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)} 
        />
      </div>
      <button className="previous-month text-2xl text-blue-800" onClick={handleNextDay}>
        <BiCaretRight></BiCaretRight>
      </button>
    </div>
  );
};

export default Datepicker;