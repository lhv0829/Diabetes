import React, { useState,useEffect } from 'react';
import { firestore } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { CiForkAndKnife } from 'react-icons/Ci'
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { MdOutlineSportsScore } from 'react-icons/md'
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { Calendar } from 'primereact/calendar';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import { sort } from './constants/constants';
import MonthModal from './MonthModal';


const CustomCalendar = ({ sort, onDateChange } : { sort : sort, onDateChange:(date:Date) => void}) => {
  const email = localStorage.getItem('Email') as string;
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string>('')
  const [data, setData] = useState({});
  const [isBloodSugar, setIsBloodSugar] = useState<boolean>(false);
  const [isFood, setIsFood] = useState<boolean>(false);
  const [isExercise, setIsExercise] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);



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
    onDateChange(date);
    setDate(new Date(date.getFullYear(), date.getMonth(), 1));
    // setShowDatePicker(false);
  };

  const handleDivClick = (clickedDate : string) => {
    
    const button = document.querySelector('button[data-hs-overlay="#hs-modal-recover-account"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
    setModalDate(clickedDate);
  };

  // useEffect(() => {
  //   const modal = document.querySelector('#hs-cookies') as HTMLDivElement;
  //   if(modal) modal.classList.remove('.hidden');
  // },[isModalOpen]);

  useEffect(() => {
    const getData = async() => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try{
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
          // console.log(doc.data()?.dates);
        });
      } catch(e) {
        console.log(e);
      }
    };
    getData();
    if(sort === 'food'){
      setIsFood(true);
      setIsBloodSugar(false);
      setIsExercise(false);
    } else if(sort === 'bloodSugar') {
      setIsFood(false);
      setIsBloodSugar(true);
      setIsExercise(false);
    } else if(sort === 'exercise') {
      setIsFood(false);
      setIsBloodSugar(false);
      setIsExercise(true);
    } else if(sort === 'total') {
      setIsFood(true);
      setIsBloodSugar(true);
      setIsExercise(true);
    }
  },[date]);

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

      days.push(
        <div className={`day w-full h-40 max-md:h-20 border`} 
          onClick={() => {
            handleDayClick(year, month, day);
            handleDivClick(dateKey);
          }} 
          key={`${year}-${month}-${day}`}>
          <div className={`day-number rounded-full w-6 h-6 ${isToday ? 'bg-green-300' : ''} text-center`}>{day}</div>
          <div className="day-details mt-1">
            <div className='max-md:hidden'>
              {(data && data[dateKey] && data[dateKey].bloodSugar && isBloodSugar) && <p className=' text-sm'>{`공복 혈당 : ${data[dateKey].bloodSugar}`}</p>}
              {(data && data[dateKey] && data[dateKey].foodCalories && isFood) && <p className=' text-sm'>{`섭취 칼로리 : ${data[dateKey].foodCalories}kcal`}</p>}
              {(data && data[dateKey] && data[dateKey].exerciseCalories && isExercise) && <p className=' text-sm'>{`소모 칼로리 : ${data[dateKey].exerciseCalories}kcal`}</p>}
            </div>
            <div className='md:hidden flex mt-2'>
              {(data && data[dateKey] && data[dateKey].bloodSugar && isBloodSugar) && <BsFileEarmarkMedical/>}
              {(data && data[dateKey] && data[dateKey].foodCalories && isFood) && <CiForkAndKnife/>}
              {(data && data[dateKey] && data[dateKey].exerciseCalories && isExercise) && <MdOutlineSportsScore/>}
            </div>
          </div>
          {/* <button type="button" className="py-3 px-4 hidden justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
            수정하기
          </button> */}
          {/* <button type="button" className="py-3 px-4 hidden justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
            Open modal
          </button> */}
          <button type="button" className="py-3 px-4 hidden justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-recover-account">
            Open modal
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar bg-white rounded-lg shadow-lg">
      <div className=' px-5'>
      </div>
      <div className="header flex justify-center gap-8 p-4 border-b">
        <button className="previous-month text-2xl text-blue-800" onClick={handlePreviousMonth}>
          <BiCaretLeft></BiCaretLeft>
        </button>
        <div className='flex bg-white'>
          <Calendar value={date} onChange={(e) => handleDateChange(e.target.value as Date)} view="month" dateFormat="mm/yy" />
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
      <div className="calendar-days grid grid-cols-7">
        {renderCalendarDays()}
      </div>
      {/* <div className="text-center">
        <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-recover-account">
          Open modal
        </button>
      </div> */}
      {/* <Modal sort={sort} dateKey={modalDate}></Modal>   */}
      <MonthModal dateKey={modalDate} sort={sort}></MonthModal>
    </div>
  );
};

export default CustomCalendar;