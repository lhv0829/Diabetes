import BloodSugarInputModal from "../BloodSugar/BloodSugarInputModal";
import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'
import Datepicker from "../Datepicker";


const DailyTotal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const loginEmail = localStorage.getItem('Email');
  const [data, setData] = useState({});
  const dateKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;


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

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
    };

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), loginEmail);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          setData(doc.data()?.dates);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[]);

  return(
    <div>
      <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>
      <div className="grid grid-flow-col overflow-auto gap-2 md:justify-around mx-auto">
        <div className="flex flex-col items-center border w-64 rounded-lg">
          <h3 className="my-6 text-3xl font-bold flex gap-2 text-gray-800 dark:text-gray-200">
            <BsFileEarmarkMedical/>공복 혈당
          </h3>
          <div className="my-6 w-64 h-36 text-3xl flex justify-center items-center">
            {data && data[dateKey] && data[dateKey].bloodSugar ? data[dateKey].bloodSugar : 0}
          </div>
          <button type="button" className="py-3 px-4 my-6 inline-flex w-24 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
            혈당 입력
          </button>
          <BloodSugarInputModal date={selectedDate}></BloodSugarInputModal>
        </div>
        <div className="flex flex-col items-center border w-64 rounded-lg">
          <h3 className="my-6 text-3xl font-bold flex gap-2 text-gray-800 dark:text-gray-200">
            <CiForkAndKnife/>식단
          </h3>
          <div className="my-6 w-64 h-36 text-3xl flex flex-col gap-3 justify-center items-center">
            <div className="flex">
              {`${data && data[dateKey] && data[dateKey].food ? data[dateKey].food : '식단 : ?'}`}
            </div>
            <div className="flex">
              {data && data[dateKey] && data[dateKey].foodCalories ? `칼로리 : ${data[dateKey].foodCalories}` : '칼로리 : ?'}
            </div>
          </div>
          <button type="button" className="py-3 px-4 my-6 inline-flex w-24 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
            식단 입력
          </button>
          <BloodSugarInputModal date={selectedDate}></BloodSugarInputModal>
        </div>
        <div className="flex flex-col items-center border w-64 rounded-lg">
          <h3 className="my-6 text-3xl font-bold flex gap-2 text-gray-800 dark:text-gray-200">
            <MdOutlineSportsScore/>운동
          </h3>
          <div className="my-6 w-64 h-36 text-3xl flex flex-col gap-3 justify-center items-center">
          <div className="flex">
              {`${data && data[dateKey] && data[dateKey].exercise ? data[dateKey].exercise : '운동 : ?'}`}
            </div>
            <div className="flex">
              {data && data[dateKey] && data[dateKey].exerciseCalories ? `칼로리 : ${data[dateKey].exerciseCalories}` : '칼로리 : ?'}
            </div>
          </div>
          <button type="button" className="py-3 px-4 my-6 inline-flex w-24 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
            운동 입력
          </button>
          <BloodSugarInputModal date={selectedDate}></BloodSugarInputModal>
        </div>
      </div>
    </div>
  )
};

export default DailyTotal;