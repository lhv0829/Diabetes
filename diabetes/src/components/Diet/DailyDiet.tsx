import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import Datepicker from "../Datepicker";
import FoodModal from './FoodModal';
import FoodList from './FoodList';
import { food } from '../constants/constants';

const DailyDiet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const loginEmail = localStorage.getItem('Email');
  const [data, setData] = useState([]);
  const dateKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
  const [foodCalories, setFoodCalories] = useState(0);

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };

  const deleteItem = async(index:number) => {
    const updatedFoodList = data.filter((food, i) => i !== index);
    const updatedCalories = foodCalories - data[index].calory;
    try{
      await setDoc(doc(firestore, "users", loginEmail), {
        "dates": {
          [dateKey]: {
            "food": updatedFoodList.length === 0 ? [] : updatedFoodList,
            'foodCalories': updatedFoodList.length === 0 ? 0 : updatedCalories
          },
        }
      }, { merge: true });
      setData(updatedFoodList);
      setFoodCalories(updatedCalories);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), loginEmail);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          const dates = doc.data()?.dates;
          if (dates && dates[dateKey] && dates[dateKey].food) {
            setData(dates[dateKey].food);
            setFoodCalories(dates[dateKey].foodCalories || 0);
          } else {
            setData([]);
            setFoodCalories(0);
          }
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[selectedDate]);

  
  return(
    <>
      <div>
        <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>
        <div className="w-full">
          <div>
            <div className='flex w-full justify-evenly text-xl font-bold border'>
              <div className='w-full text-center border border-slate-700'>음식</div>
              <div className='w-full text-center border border-slate-700'>칼로리</div>
            </div>
            { Array.isArray(data) && data.map((food:food, idx:number) => <FoodList name={food.name} calory={food.calory} idx={idx} onDelete={deleteItem} key={`${food.name}${idx}`}></FoodList>)}
          </div>
        </div>
          <div className=' border-t-2 mt-8 w-full flex gap-8 justify-end items-center'>
            <div className=' text-center font-semibold text-2xl'>
              {`Total : ${foodCalories}kcal`}
            </div>
            <button type="button" className="py-3 px-4 my-6 inline-flex w-24 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">추가하기</button>
          </div>
        <FoodModal date={selectedDate}></FoodModal>
      </div>
    </>
  )
};

export default DailyDiet;