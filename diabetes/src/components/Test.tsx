import { firestore } from "../firebase";
import { collection, addDoc, setDoc, doc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'

const Test = () => {
  const email = localStorage.getItem('Email') as string;
  const [loginEmail, setLoginEmail] = useState(email);
  // console.log(loginEmail);
  // console.log(firestore);
  useEffect(() => {
    console.log(loginEmail);
  }, [loginEmail]);

  const dbTest = async() => {
    try {
      const docRef = await setDoc(doc(firestore, "users", loginEmail), {
          "dates": {
            "2023-05-01": {
              "bloodSugar": 100,
              "food": "eggs, toast",
              "foodCalories": 300,
              "exercise": "walking",
              "exerciseCalories": 100
            },
            "2023-05-02": {
              "bloodSugar": 110,
              "food": "banana, yogurt",
              "foodCalories": 200,
              "exercise": "running",
              "exerciseCalories": 200
            },
          }});
      // console.log("Document written with ID: ", docRef.id);
      console.log(loginEmail);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const AddTest = async() => {
    try {
      const docRef = await setDoc(doc(firestore, "users", loginEmail), {
          "dates": {
            ["2023-05-03"]: {
              "bloodSugar": 100,
              "food": "eggs, toast",
              "foodCalories": 300,
              "exercise": "walking",
              "exerciseCalories": 100
            },
           [ "2023-05-04"]: {
              "bloodSugar": 110,
              "food": "banana, yogurt",
              "foodCalories": 200,
              "exercise": "running",
              "exerciseCalories": 200
            },
            ["2023-05-06"]: {
              "bloodSugar": 100,
              "food": "eggs, toast",
              "foodCalories": 300,
            },
           [ "2023-05-07"]: {
              "bloodSugar": 110,
              "exercise": "running",
              "exerciseCalories": 200
            },
          }}, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const AddTest2 = async() => {
    try {
      const docRef = await setDoc(doc(firestore, "users", loginEmail), {
          "dates": {
            ["2023-05-07"]: {
              // "bloodSugar": 100
              "food": "eggs, toast",
              // "foodCalories": 300,
              // "exercise": "walking",
              // "exerciseCalories": 100
            },
           [ "2023-05-08"]: {
              // "bloodSugar": 110
              "food": "banana, yogurt",
              // "foodCalories": 200,
              // "exercise": "running",
              // "exerciseCalories": 200
            },
          }}, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const ConsoleTest = async() => {
    const documentRef = doc(collection(firestore, 'users'), loginEmail);
    try {
      const querySnapshot = await getDoc(documentRef);
      console.log(querySnapshot.data()?.dates);
      // querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().dates['2022-05-04'].bloodSugar}`);
      // });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const checkEmail = () => {
    console.log(loginEmail);
  };
  
  return(
    <section className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
      <section className="w-full max-w-md mx-auto p-6 flex-col flex">
        <button type="button" onClick={dbTest} className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
          AddButton
        </button>
        <button type="button" onClick={AddTest} className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
          UpdateButton
        </button>
        <button type="button" onClick={dbTest} className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
          DeleteButton
        </button>
        <button type="button" onClick={AddTest2} className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
          Update Button 22
        </button>
        <button type="button" onClick={ConsoleTest} className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
          Console Button
        </button>
      </section>
    </section>
  )
};

export default Test;

// {
//   "users": {
//     "user1@example.com": {
//       "dates": {
//         "2022-05-01": {
//           "bloodSugar": 100,
//           "food": "eggs, toast",
//           "foodCalories": 300,
//           "exercise": "walking",
//           "exerciseCalories": 100
//         },
//         "2022-05-02": {
//           "bloodSugar": 110,
//           "food": "banana, yogurt",
//           "foodCalories": 200,
//           "exercise": "running",
//           "exerciseCalories": 200
//         }
//       }
//     },
//     "user2@example.com": {
//       "dates": {
//         "2022-05-01": {
//           "bloodSugar": 90,
//           "food": "cereal, milk",
//           "foodCalories": 250,
//           "exercise": "",
//           "exerciseCalories": 0
//         },
//         "2022-05-02": {
//           "bloodSugar": 95,
//           "food": "sandwich, chips",
//           "foodCalories": 500,
//           "exercise": "swimming",
//           "exerciseCalories": 300
//         }
//       }
//     }
//   }
// }