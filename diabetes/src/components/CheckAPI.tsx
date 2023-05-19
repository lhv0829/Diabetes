import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY, APP_ID } from "./constants/constants";
// import {} from 'nutritionix-api'

const CheckAPI = () => {
  const [foodResults, setFoodResults] = useState([]);
  const [exerciseResults, setExerciseResults] = useState([]);
  const [food, setFood] = useState<string>("");
	const [exercise, setExercise] = useState('');
	// const BASE_URL = 'https://api.spoonacular.com/';
	const BASE_FOOD_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
	const BASE_EXERCISE_URL = 'https://trackapi.nutritionix.com/v2/natural/exercise';

	const handleFoodFormSubmit =async (e:React.FormEvent) => {
		e.preventDefault();
		// const url = `https://api.nutritionix.com/v1_1/search/${encodeURIComponent(food)}?results=0:1&fields=item_name,nf_calories&appId=${APP_ID}&appKey=${API_KEY}`
		try {
			console.log(food);
			const response = await axios.post(BASE_FOOD_URL, { query : food},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': API_KEY,
					'x-remote-user-id' : '0'
				}
			});
			console.log(`음식 결과는?`);
			console.log(response);
			setFoodResults(response.data.foods);
			// console.log(results);
		} catch (e) {
			console.log(e);
			setFoodResults([]);
		}
	}
	const handleExerciseFormSubmit =async (e:React.FormEvent) => {
		e.preventDefault();
		// const url = `https://api.nutritionix.com/v1_1/search/${encodeURIComponent(food)}?results=0:1&fields=item_name,nf_calories&appId=${APP_ID}&appKey=${API_KEY}`
		try {
			console.log(exercise);
			const response = await axios.post(BASE_EXERCISE_URL, { query : exercise},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': API_KEY,
					'x-remote-user-id' : '0'
				}
			});
			console.log(`운동 결과는?`);
			console.log(response);
			setExerciseResults(response.data.exercises);
			// console.log(results);
		} catch (e) {
			console.log(e);
			setExerciseResults([]);
		}
	}

	useEffect(() => {
		console.log(`response.data.exercise?`);
		console.log(exerciseResults);
	}, [exerciseResults]);

	useEffect(() => {
		console.log(`response.data.foods?`);
		console.log(foodResults);
	}, [foodResults]);

  return( 
		<>
			<h2 className="text-3xl">API Test</h2>
			<div className="border w-96 h-72">
				<form onSubmit={handleFoodFormSubmit}>
					<input 
						type="text"
						value={food}
						onChange={e => setFood(e.target.value)}
						placeholder="음식"
						className="border" />
					<button className="btn" type="submit">제출</button>
				</form>
			</div>
			<div className="border w-96 h-72">
				<form onSubmit={handleExerciseFormSubmit}>
					<input 
						type="text"
						value={exercise}
						onChange={e => setExercise(e.target.value)}
						placeholder="운동"
						className="border" />
					<button className="btn" type="submit">제출</button>
				</form>
			</div>
			{/* {results &&
			(<ul className="w-full border-4">
				{results.map((result) => (
					<li key={result.id}>
						<img src={result.image} alt={result.title} />
						<p>{result.title}</p>
						<p>Calories: {result.nutrition?.nutrients.find((nutrient: any) => nutrient.title === 'Calories')?.amount}</p>
						<p>Fat: {result.nutrition?.nutrients.find((nutrient: any) => nutrient.title === 'Fat')?.amount}</p>
						<p>Carbohydrates: {result.nutrition?.nutrients.find((nutrient: any) => nutrient.title === 'Carbohydrates')?.amount}</p>
						<p>Protein: {result.nutrition?.nutrients.find((nutrient: any) => nutrient.title === 'Protein')?.amount}</p>
					</li>
				))}
			</ul>)}
			{(results === undefined) && <h2 className="text-2xl"> 안뜸...</h2>} */}
		</>
	)
};

export default CheckAPI;
