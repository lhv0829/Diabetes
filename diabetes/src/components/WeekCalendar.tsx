import React, { useState, useEffect } from 'react';
import { BsCalendarCheck } from 'react-icons/bs'
import { firestore } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { sort } from './constants/constants';
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'
import Modal from './Modal';

const WeekCalendar = ({date, sort}:{date:Date, sort:sort}) => {
  const email = localStorage.getItem('Email') as string;
  const [selectedDate, setSelectedDate] = useState(date);
  const [data, setData] = useState({});
  const [isBloodSugar, setIsBloodSugar] = useState<boolean>(false);
  const [isFood, setIsFood] = useState<boolean>(false);
  const [isExercise, setIsExercise] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState('');

  const handleDivClick = (clickedDate : string) => {
    const button = document.querySelector('button[data-hs-overlay="#hs-cookies"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
    setModalDate(clickedDate);
  };

  useEffect(() => {
    setSelectedDate(date)
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
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


  const renderWeekDays = () => {
    const days = [];
    const dayOfWeek = selectedDate.getDay();
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - dayOfWeek);
    const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - dayOfWeek + 6);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const selected = day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

      days.push(
        <>
          <div className={`day`} key={`${year}-${month}-${day}`}>
            <div className="day-of-week border">
              {getDayOfWeek(date.getDay())}
            </div>
            <div className='border' 
              onClick={(event) => {
                event.preventDefault();
                handleDivClick(dateKey);}}>
              <div className='flex gap-1'>
                <div className={`day-number w-6 ${selected ? 'rounded-full bg-blue-200' : ''} text-center`}>
                  {day === 1 ? `${month + 1}/${day}` : day}
                </div>
                {isToday && <div className='flex justify-center items-center'><BsCalendarCheck></BsCalendarCheck></div>}
              </div>
              <div className='h-36 leading-5'>
                <div className='max-md:hidden flex flex-col gap-1'>
                  {(data && data[dateKey] && data[dateKey].bloodSugar && isBloodSugar) && <p>{`공복 혈당 : ${data[dateKey].bloodSugar}`}</p>}
                  {(data && data[dateKey] && data[dateKey].foodCalories && isFood) && <p>{`섭취 칼로리 : ${data[dateKey].foodCalories}`}</p>}
                  {(data && data[dateKey] && data[dateKey].exerciseCalories && isExercise) && <p>{`소모 칼로리 : ${data[dateKey].exerciseCalories}`}</p>}
                </div>
                <div className='md:hidden flex mt-2 flex-col gap-2 text-xl'>
                  {(data && data[dateKey] && data[dateKey].bloodSugar && isBloodSugar) && <div className='flex text-xl'><span className='flex items-center'><BsFileEarmarkMedical/></span><p className='max-md:text-lg'>{data[dateKey].bloodSugar}</p></div>}
                  {(data && data[dateKey] && data[dateKey].foodCalories && isFood) && <div className='flex text-xl'><span className='flex items-center'><CiForkAndKnife/></span><p className='max-md:text-lg'>{data[dateKey].foodCalories}</p></div>}
                  {(data && data[dateKey] && data[dateKey].exerciseCalories && isExercise) && <div className='flex text-xl'><span className='flex items-center'><MdOutlineSportsScore/></span><p className='max-md:text-lg'>{data[dateKey].exerciseCalories}</p></div>}
                </div>
              </div>
              <button type="button" className="py-3 px-4 hidden justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
                수정하기
              </button>
            </div>
          </div>
        </>
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
        <Modal sort={sort} dateKey={modalDate}></Modal>
      </div>
    </div>
  );
};

export default WeekCalendar;