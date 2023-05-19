import { setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { firestore } from "../firebase";
import { sort } from "./constants/constants";

const WeekModal = ( { sort, dateKey } : { sort:sort, dateKey : string} ) => {
  const email = localStorage.getItem('Email') as string;
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
  const sortName = sort === 'bloodSugar' ? '공복 혈당' : sort === 'food' ? '식단' : sort === 'exercise' ? '운동' : '종합';

  useEffect(() => {
    const getData =async () => {
      const documentRef = doc(collection(firestore, 'users'), email);
      try {
        const query = await onSnapshot(documentRef, (doc) => {
          setFormData(doc.data()?.dates[dateKey] || {});
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    getData();
  },[]);

  const handleInputChange = async(e : React.ChangeEvent<HTMLInputElement>) => {
    const { id, value} = e.target;
    // setFormData(prevData => ({
    //   ...prevData,
    //   [id]: value
    // }));
    if (sort === 'total') {
      // Handle separate input fields for 'bloodSugar', 'food', and 'exercise'
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      // For other sorts, update the 'sort' directly in formData
      setFormData({
        [sort]: value,
      });
    }
  };

  const handleUpdateData = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let updatedData = {};

      if (sort === 'total') {
        updatedData = {
          'dates' : {
            [dateKey] : {
              [`bloodSugar`]: parseFloat(formData.bloodSugar as string) || '',
              [`food`]: formData.food || '',
              [`exercise`]: formData.exercise || '',
            },
          }
        };
      } else {
        const value = sort === 'bloodSugar' ? parseFloat(formData.bloodSugar as string) : formData[sort];
        updatedData = {
          'dates' : {
            [dateKey] : {
              [sort]: value || '',
            }
          }
        };
      }
      const docRef = await setDoc(doc(firestore, 'users', email), updatedData, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return(
    <>
      <div id="hs-cookies" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <div className="absolute top-2 right-2">
              <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                {`${dateKey} ${sortName}`}
              </h3>
            </div>
            <form>
              <div className="flex flex-col gap-4">
                <div className="p-4 overflow-y-auto flex justify-center">
                  { (sort === 'bloodSugar' || sort === 'exercise' || sort === 'food') &&
                    <input 
                    type={sort === 'bloodSugar' ? 'number' : 'text'}
                    id={sort}
                    onChange={handleInputChange}
                    value={formData[sort] || ''}
                    placeholder="Type here" 
                    className="input input-bordered input-accent w-full max-w-xs" />}
                  {
                    (sort === 'total') && ( 
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <label htmlFor="bloodSugar" className="w-28 flex items-center">공복 혈당</label>
                        <input 
                          type={'number'}
                          id={'bloodSugar'}
                          onChange={handleInputChange}
                          value={formData.bloodSugar || ''}
                          placeholder="Type here" 
                          className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="bloodSugar" className="w-28 flex items-center">식단</label>
                          <input 
                            type={'text'}
                            id={'food'}
                            onChange={handleInputChange}
                            value={formData.food || ''}
                            placeholder="Type here" 
                            className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="bloodSugar" className="w-28 flex items-center">운동</label>
                        <input 
                          type={'text'}
                          id={'exercise'}
                          onChange={handleInputChange}
                          value={formData.exercise || ''}
                          placeholder="Type here" 
                          className="input input-bordered input-accent w-full max-w-xs" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <button type="button" className="p-4 w-full inline-flex justify-center items-center gap-2 rounded-none rounded-bl-xl bg-gray-100 border border-transparent font-semibold text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-100 focus:ring-offset-2 transition-all text-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
                    닫기
                  </button>
                  <button type="button" onClick={handleUpdateData} className="p-4 w-full inline-flex justify-center items-center gap-2 rounded-none rounded-br-xl border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-cookies">
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

export default WeekModal;