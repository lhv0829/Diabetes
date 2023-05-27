import { setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { firestore } from "../firebase";
import { sort } from "./constants/constants";
import axios from "axios";
import { NUT_API_KEY, APP_ID } from "./constants/constants";

const MonthModal = ( { sort, dateKey } : { sort:sort, dateKey : string} ) => {
  const email = localStorage.getItem('Email') as string;
  const sortName = sort === 'bloodSugar' ? '공복 혈당' : sort === 'food' ? '식단' : sort === 'exercise' ? '운동' : '종합';
  const BASE_FOOD_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients'; 
  const BASE_EXERCISE_URL = 'https://trackapi.nutritionix.com/v2/natural/exercise';

  const [data, setData] = useState({food:[], exercise:[]});
  const [food, setFood] = useState('');
  const [exercise, setExercise] = useState('');
  const [bloodSugar, setBloodSugar] = useState(0);
  const [foodCalories, setFoodCalories] = useState<number>(0);
  const [exerciseCalories, setExerciseCalories] = useState<number>(0);

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          const dates = doc.data()?.dates;
          if (sort === 'total') {
            if (dates && dates[dateKey]) {
              const totalData = dates[dateKey];
              setBloodSugar(totalData.bloodSugar || 0);
              setFoodCalories(totalData.foodCalories || 0);
              setExerciseCalories(totalData.exerciseCalories || 0);
              const foodData = totalData.food || [];
              const exerciseData = totalData.exercise || [];
              setData({ food: foodData, exercise: exerciseData });
            } else {
              setBloodSugar(0);
              setFoodCalories(0);
              setExerciseCalories(0);
              setData({ food: [], exercise: [] });
            }
          } else if (sort === 'bloodSugar') {
            if (dates && dates[dateKey] && dates[dateKey].bloodSugar !== undefined) {
              setBloodSugar(dates[dateKey].bloodSugar);
            } else {
              setBloodSugar(0);
            }
          } else if (sort === 'food') {
            if (dates && dates[dateKey] && dates[dateKey].food) {
              setData({ food: dates[dateKey].food, exercise: [] });
              setFoodCalories(dates[dateKey].foodCalories || 0);
            } else {
              setData({ food: [], exercise: [] });
              setFoodCalories(0);
            }
          } else if (sort === 'exercise') {
            if (dates && dates[dateKey] && dates[dateKey].exercise) {
              setData({ food: [], exercise: dates[dateKey].exercise });
              setExerciseCalories(dates[dateKey].exerciseCalories || 0);
            } else {
              setData({ food: [], exercise: [] });
              setExerciseCalories(0);
            }
          }
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[dateKey]);

  const handleUpdateData = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (sort === 'total') {
        AddBloodsugar();
        AddFood();
        AddExercise();
      } else if(sort === 'bloodSugar'){
        AddBloodsugar();
      } else if(sort === 'food'){
        AddFood();
      } else if(sort === 'exercise'){
        AddExercise();
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddBloodsugar = async() => {
    try {
      const docRef = await setDoc(doc(firestore, "users", email), {
          "dates": {
            [dateKey]: {
              "bloodSugar": bloodSugar
            },
          }}, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddFood = async() => {
    try {
      const response = await axios.post(BASE_FOOD_URL, { query : food},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
      const updatedFoodCalories = foodCalories + response.data.foods[0].nf_calories;
      const updatedData = {
        "dates": {
          [dateKey]: {
            "food": data.food.length === 0 ? [
              {
                'name': food,
                'calory': response.data.foods[0].nf_calories
              }
            ] : [
              ...data.food,
              {
                'name': food,
                'calory': response.data.foods[0].nf_calories
              }
            ],
            'foodCalories': updatedFoodCalories
          },
        }
      };
      const docRef = await setDoc(doc(firestore, "users", email), updatedData, { merge: true });
      setData({food : updatedData.dates[dateKey].food, exercise: data.exercise})
      setFoodCalories(updatedData.dates[dateKey].foodCalories)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddExercise = async() => {
    try {
      const response = await axios.post(BASE_EXERCISE_URL, { query : exercise},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
      const updatedExerciseCalories = exerciseCalories + Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30);
      // setCalory(response.data.foods[0].nf_calories)
      const updatedData = {
        "dates": {
          [dateKey]: {
            "exercise": data.exercise.length === 0 ? [
              {
                'name': exercise,
                'calory': Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30)
              }
            ] : [
              ...data.exercise,
              {
                'name': exercise,
                'calory': Math.floor((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min) * 30)
              }
            ],
            'exerciseCalories': updatedExerciseCalories
          },
        }
      };
      const docRef = await setDoc(doc(firestore, "users", email), updatedData, { merge: true });
      setData({food : data.food ,exercise : updatedData.dates[dateKey].exercise})
      setExerciseCalories(updatedData.dates[dateKey].exerciseCalories)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return(
    <>
      <div id="hs-modal-recover-account" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <div className="absolute top-2 right-2">
              <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-recover-account">
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                {dateKey}
              </h3>
              <p className="text-xl font-semibold">{sortName}</p>
            </div>
            <form>
              <div className="flex flex-col gap-4">
                <div className="p-4 overflow-y-auto flex justify-center">
                  { (sort === 'bloodSugar' || sort === 'exercise' || sort === 'food') &&
                    <input 
                    type={sort === 'bloodSugar' ? 'number' : 'text'}
                    id={`weekly-${sort}`}
                    onChange={e => {
                      if(sort === 'bloodSugar') setBloodSugar(Number(e.target.value));
                      if(sort === 'food') setFood(e.target.value);
                      if(sort === 'exercise') setExercise(e.target.value);
                    }}
                    value={sort === 'bloodSugar' ? bloodSugar : sort === 'food' ? food : exercise}
                    // placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs" />}
                  {
                    (sort === 'total') && ( 
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <label htmlFor="weekly-bloodSugar" className="w-28 flex items-center">공복 혈당</label>
                        <input 
                          type={'number'}
                          id={'weekly-bloodSugar'}
                          onChange={e => setBloodSugar(Number(e.target.value))}
                          value={bloodSugar}
                          placeholder="Type here" 
                          className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="weekly-food" className="w-28 flex items-center">식단</label>
                          <input 
                            type={'text'}
                            id={'weekly-food'}
                            onChange={e => setFood(e.target.value)}
                            value={food}
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="weekly-exercise" className="w-28 flex items-center">운동</label>
                        <input 
                          type={'text'}
                          id={'weekly-exercise'}
                          onChange={e => setExercise(e.target.value)}
                          value={exercise}
                          placeholder="Type here" 
                          className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <button type="button" className="p-4 w-full inline-flex justify-center items-center gap-2 rounded-none rounded-bl-xl bg-gray-100 border border-transparent font-semibold text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-100 focus:ring-offset-2 transition-all text-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-recover-account">
                    닫기
                  </button>
                  <button type="button" onClick={handleUpdateData} className="p-4 w-full inline-flex justify-center items-center gap-2 rounded-none rounded-br-xl border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-recover-account">
                    확인
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
};

export default MonthModal;