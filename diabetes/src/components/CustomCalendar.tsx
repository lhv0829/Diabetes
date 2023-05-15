import React, { useState,useEffect } from 'react';
import { firestore } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'
import { BiCheck, BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 


const CustomCalendar = ({ kind } : { kind : string}) => {
  const email = localStorage.getItem('Email') as string;
  const [loginEmail, setLoginEmail] = useState<string>(email);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string>('')
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [isModal, setIsModal] = useState<boolean>(false);

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ];

  const daysInMonth = (month : number, year : number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month : number, year : number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDateChange = (date : Date) => {
    setSelectedDate(date);
    setDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setShowDatePicker(false);
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  useEffect(() => {
    const getData = async() => {
      const documentRef = doc(collection(firestore, 'users'), loginEmail);
      try{
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
          console.log(doc.data()?.dates);
        });
      } catch(e) {
        console.log(e);
      }
    };
    getData();
  },[]);

  const dietCalendar = (year:number, month:number, day:number):boolean => {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    let dayData = null;
    if (data && data[dateKey]) {
      dayData = data[dateKey];
    }
    if(dayData !== null && dayData.food !== undefined) return true;
    else return false;
  };

  const exerciseCalendar = (year:number, month:number, day:number):boolean => {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    let dayData = null;
    if (data && data[dateKey]) {
      dayData = data[dateKey];
    }

    if(dayData !== null && dayData.exercise !== undefined) return true;
    else return false;
  };

  const bloodSugarCalendar = (year:number, month:number, day:number):boolean => {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    let dayData = null;
    if (data && data[dateKey]) {
      dayData = data[dateKey];
    }

    if(dayData !== null && dayData.bloodSugar !== undefined) return true;
    else return false;
  };
  const handleDayClick = (year:number, month:number, day:number) => {
    setSelectedDateKey(`${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(date.getMonth(), date.getFullYear());

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const day = i;
      const month = date.getMonth();
      const year = date.getFullYear();
      const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      
      const food = kind === 'food' && dietCalendar(year, month, day);
      const exercise = kind === 'exercise' && exerciseCalendar(year, month, day);
      const bloodsugar = kind === 'bloodsugar' && bloodSugarCalendar(year, month, day);

      days.push(
        <div className={`day w-full h-16 border`} onClick={() => handleDayClick(year, month, day)} key={`${year}-${month}-${day}`}>
          <div className={`day-number rounded-full w-6 h-6 ${isToday ? 'bg-blue-300' : ''}`}>{day}</div>
          <div className="day-details">
            {food && <CiForkAndKnife></CiForkAndKnife>}
            {exercise && <MdOutlineSportsScore></MdOutlineSportsScore>}
            {bloodsugar && <BiCheck></BiCheck>}
            {/* <textarea className="diet-input bg-white border rounded-lg p-2 m-2" placeholder="Enter diet" value={diet} onChange={handleDietChange} />
            <textarea className="exercise-input bg-white border rounded-lg p-2 m-2" placeholder="Enter exercise" value={exercise} onChange={handleExerciseChange} /> */}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar bg-white rounded-lg shadow-lg">
      <div className=' px-5'>
        <div className='flex w-96 bg-white'>
          <Calendar value={selectedDate} onChange={(e) => handleDateChange(e.target.value as Date)} view="month" dateFormat="mm/yy" />
        </div>
      </div>
      <div className="header flex justify-center gap-8 p-4 border-b">
        <button className="previous-month text-2xl text-blue-800" onClick={handlePreviousMonth}>
          <BiCaretLeft></BiCaretLeft>
        </button>
        <div className="month-year text-lg font-medium">
          <h2>
            {date.getFullYear()} {monthNames[date.getMonth()]} 
          </h2>
        </div>
        <button className="next-month text-2xl text-blue-800" onClick={handleNextMonth}>
          <BiCaretRight></BiCaretRight>
        </button>
      </div>
      <div className="days-of-week grid grid-cols-7 text-center text-sm font-medium p-4 border-b">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-days grid grid-cols-7">{renderCalendarDays()}</div>
    </div>
  );
};

export default CustomCalendar;