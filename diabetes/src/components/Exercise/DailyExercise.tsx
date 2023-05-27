import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";
import Datepicker from "../Datepicker";
import { exercise } from '../constants/constants';
import ExerciseList from './ExerciseList';
import ExerciseModal from './ExerciseModal';

const DailyExercise = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const loginEmail = localStorage.getItem('Email');
  const [data, setData] = useState([]);
  const dateKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
  const [exerciseCalories, setExerciseCalories] = useState(0);

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
    };

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), loginEmail);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          const dates = doc.data()?.dates;
          if (dates && dates[dateKey] && dates[dateKey].exercise) {
            setData(dates[dateKey].exercise);
            setExerciseCalories(dates[dateKey].exerciseCalories || 0);
          } else {
            setData([]);
            setExerciseCalories(0);
          }
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[selectedDate]);
  
  // const handleUpdateData = async(e : React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //     let updatedData = {};

  //     if (sort === 'total') {
  //       updatedData = {
  //         'dates' : {
  //           [dateKey] : {
  //             [`bloodSugar`]: parseFloat(formData.bloodSugar as string) || '',
  //             [`food`]: formData.food || '',
  //             [`exercise`]: formData.exercise || '',
  //           },
  //         }
  //       };
  //     } else {
  //       const value = sort === 'bloodSugar' ? parseFloat(formData.bloodSugar as string) : formData[sort];
  //       updatedData = {
  //         'dates' : {
  //           [dateKey] : {
  //             [sort]: value || '',
  //           }
  //         }
  //       };
  //     }
  //     const docRef = await setDoc(doc(firestore, 'users', email), updatedData, { merge: true });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };
  return(
    <>
      <div>
        <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>
        <div className="w-full">
          <div>
            <div className='flex w-full justify-evenly text-xl font-bold border'>
              <div className='w-full text-center border border-slate-700'>운동</div>
              <div className='w-full text-center border border-slate-700'>칼로리</div>
            </div>
            { Array.isArray(data) && data.map((exercise:exercise, idx:number) => <ExerciseList name={exercise.name} calory={exercise.calory} key={`${exercise.name}${idx}`}></ExerciseList>)}
          </div>
        </div>
          <div className=' border-t-2 mt-8 w-full flex gap-8 justify-end items-center'>
            <div className=' text-center font-semibold text-2xl'>
              {`Total : ${exerciseCalories}kcal`}
            </div>
            <button type="button" className="py-3 px-4 my-6 inline-flex w-24 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">추가하기</button>
          </div>
        <ExerciseModal date={selectedDate}></ExerciseModal>
      </div>
    </>
  )
};

export default DailyExercise;