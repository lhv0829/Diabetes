import BloodSugarInputModal from "./BloodSugarInputModal";
import { useState, useEffect } from 'react';
import { collection, addDoc, setDoc, doc, updateDoc, getDocs, getDoc, DocumentData } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useRecoilValue } from "recoil";
import { loginAccount } from "../../atom/loginAccount";

const DailyBloodSugar = () => {
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

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), loginEmail);
      try {
        const query = await getDoc(documentRef);
        setData(query.data()?.dates);
        console.log(query.data()?.dates);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[]);

  useEffect(() => {
    console.log(selectedDate);
  },[selectedDate]);

  return(
    <div>
      <div className="header flex justify-between p-4 border-b">
        <button onClick={handlePrevDay}>Prev</button>
        <div className="date-picker">
          <label htmlFor="selected-date" className="font-medium mr-2">
            Selected date:
          </label>
          <input type="date" id="selected-date" className="border rounded-lg p-2" value={new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)} onChange={(event) => setSelectedDate(new Date(event.target.value))} />        </div>
        <button onClick={handleNextDay}>Next</button>
      </div>
      <div>
        혈당 
      </div>
      <div>
        {data && data[dateKey] && data[dateKey].bloodSugar ? data[dateKey].bloodSugar : 0}
      </div>
      <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
        혈당 입력
      </button>
      <BloodSugarInputModal date={selectedDate}></BloodSugarInputModal>
    </div>
  )
};

export default DailyBloodSugar;