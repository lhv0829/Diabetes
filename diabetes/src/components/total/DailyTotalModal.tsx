import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { firestore } from "../../firebase";
import { sort } from "../constants/constants";
import axios from "axios";
import { NUT_API_KEY, APP_ID } from "../constants/constants";

const DailyTotalModal = (
  {sort, date, food, exercise, totalFoodCalories, totalExerciseCalories}
   : 
  {sort:sort, date:Date, food:object, exercise:object, totalFoodCalories:number, totalExerciseCalories:number}) => {
  const email = localStorage.getItem('Email') as string;
  const BASE_FOOD_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients'; 
  const BASE_EXERCISE_URL = 'https://trackapi.nutritionix.com/v2/natural/exercise';
  const sortName = sort === 'bloodSugar' ? '공복 혈당' : sort === 'food' ? '식단' : '운동';

  const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const [value, setValue] = useState('');
  const [data, setData] = useState({foods:[], exercises:[]});
  const [foodCalories, setFoodCalories] = useState<number>(0);
  const [exerciseCalories, setExerciseCalories] = useState<number>(0);


  // useEffect(() => {
  //   const resetData = () => {
  //     setValue("");
  //     setData({ foods: [], exercises: [] });
  //     setFoodCalories(0);
  //     setExerciseCalories(0);
  //   };

  //   resetData();
  // }, []);
  
  useEffect(() => {
    const resetData = () => {
      setValue("");
      setData({ foods: [], exercises: [] });
      setFoodCalories(0);
      setExerciseCalories(0);
    };

    resetData();
    // setValue('');
    setData({ foods : food ? food : [], exercises : exercise? exercise : []});
    setFoodCalories(totalFoodCalories);
    setExerciseCalories(totalExerciseCalories);
  },[date])

  const handleCloseModal = () => {
    const button = document.querySelector('button[data-hs-overlay="#hs-slide-down-animation-modal"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
  };

  const AddBloodsugar = async() => {
    try {
      const docRef = await setDoc(doc(firestore, "users", email), {
          "dates": {
            [dateKey]: {
              "bloodSugar": Number(value)
            },
          }}, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddFood = async() => {
    try {
      const response = await axios.post(BASE_FOOD_URL, { query : value},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
      const updatedFoodCalories = foodCalories + Math.round(response.data.foods[0].nf_calories);
      const updatedData = {
        "dates": {
          [dateKey]: {
            "food": data.foods.length === 0 ? [
              {
                'name': value,
                'calory': Math.round(response.data.foods[0].nf_calories)
              }
            ] : [
              ...data.foods,
              {
                'name': value,
                'calory': Math.round(response.data.foods[0].nf_calories)
              }
            ],
            'foodCalories': updatedFoodCalories,
            'exercise': data.exercises,
            'exerciseCalories' : exerciseCalories
          },
        }
      };
      const docRef = await setDoc(doc(firestore, "users", email), updatedData, { merge: true });
      setData({foods : updatedData.dates[dateKey].food, exercises: data.exercises})
      setFoodCalories(updatedData.dates[dateKey].foodCalories)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddExercise = async() => {
    try {
      const response = await axios.post(BASE_EXERCISE_URL, { query : value},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
      const updatedExerciseCalories = exerciseCalories + Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30);
      const updatedData = {
        "dates": {
          [dateKey]: {
            "exercise": data.exercises.length === 0 ? [
              {
                'name': value,
                'calory': Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30)
              }
            ] : [
              ...data.exercises,
              {
                'name': value,
                'calory': Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30)
              }
            ],
            'exerciseCalories': updatedExerciseCalories,
            'food' : data.foods,
            'foodCalories' : foodCalories
          },
        }
      };
      const docRef = await setDoc(doc(firestore, "users", email), updatedData, { merge: true });
      setData({foods : data.foods ,exercises : updatedData.dates[dateKey].exercise})
      setExerciseCalories(updatedData.dates[dateKey].exerciseCalories)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleUpdateData = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(sort === 'bloodSugar'){
        AddBloodsugar();
      } else if(sort === 'food'){
        AddFood();
      } else if(sort === 'exercise'){
        AddExercise();
      }
      handleCloseModal();
      setValue('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return(
    <>
      <div id="hs-slide-down-animation-modal" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white flex">
                {`${sortName} 입력`}
              </h3>
              <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdateData}>
              <div className="p-4 overflow-y-auto">
              <input 
                type="text" 
                onChange={e =>{ 
                  setValue(e.target.value);
                }} 
                value={value} 
                placeholder="Type here" 
                className="input input-bordered input-accent w-full max-w-xs" />
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
                  Close
                </button>
                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default DailyTotalModal;