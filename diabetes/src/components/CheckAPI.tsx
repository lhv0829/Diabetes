import axios from "axios";
import { useEffect, useState } from "react";
import { NUT_API_KEY, APP_ID } from "./constants/constants";
// import {} from 'nutritionix-api'

const CheckAPI = () => {
  const [foodResults, setFoodResults] = useState([]);
  const [exerciseResults, setExerciseResults] = useState([]);
  const [food, setFood] = useState<string>("");
	const [exercise, setExercise] = useState('');
	// const [image, setImage] = useState<File>();
	// const BASE_IMAGE_URL = `https://api.spoonacular.com/food/images/classify?apiKey = ${SPOON_API_KEY}`;
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
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
			console.log(`음식 결과는?`);
			console.log(response.data.foods[0].nf_calories);
			setFoodResults(response.data.foods);
			// console.log(results);
		} catch (e) {
			console.log(e);
			setFoodResults([]);
		}
	}

	// const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files[0] as File;
	// 	setImage(file);
	// };

	// const handleImageFormSubmit =async (e:React.FormEvent) => {
	// 	e.preventDefault();
	// 	// const url = `https://api.nutritionix.com/v1_1/search/${encodeURIComponent(food)}?results=0:1&fields=item_name,nf_calories&appId=${APP_ID}&appKey=${API_KEY}`
	// 	try {
	// 		console.log(image);
	// 		const response = await axios.post(BASE_IMAGE_URL, { file : image});
	// 		console.log(`사진 결과는?`);
	// 		console.log(response);
	// 		// setFoodResults(response.data.foods);
	// 		// console.log(results);
	// 	} catch (e) {
	// 		console.log(e);
	// 		// setFoodResults([]);
	// 	}
	// }


	const handleExerciseFormSubmit =async (e:React.FormEvent) => {
		e.preventDefault();
		// const url = `https://api.nutritionix.com/v1_1/search/${encodeURIComponent(food)}?results=0:1&fields=item_name,nf_calories&appId=${APP_ID}&appKey=${API_KEY}`
		try {
			console.log(exercise);
			const response = await axios.post(BASE_EXERCISE_URL, { query : exercise},{
				headers: {
					'x-app-id': APP_ID,
					'x-app-key': NUT_API_KEY,
					'x-remote-user-id' : '0'
				}
			});
			console.log(`운동 결과는?`);
			// console.log(response.data.exercises[0].nf_calories);
			console.log((response.data.exercises[0].nf_calories / response.data.exercises[0].duration_min)*30);
			setExerciseResults(response.data.exercises);
			// console.log(results);
		} catch (e) {
			console.log(e);
			setExerciseResults([]);
		}
	}

	// useEffect(() => {
	// 	console.log(`response.data.exercise?`);
	// 	console.log(exerciseResults);
	// }, [exerciseResults]);

	// useEffect(() => {
	// 	console.log(`response.data.foods?`);
	// 	console.log(foodResults);
	// }, [foodResults]);

  return( 
		<>
			<h2 className="text-3xl">API Test</h2>
			<div className="border w-96 h-36">
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
			{/* <div className="border w-96 h-36">
				<form onSubmit={handleImageFormSubmit}>
					<input type="file" accept="image/*" onChange={handleImageChange} className="file-input w-full max-w-xs" />
					<button className="btn" type="submit">제출</button>
				</form>
				{image && (<img src={image} alt="Selected" />)}
			</div> */}
			<div className="border w-96 h-36">
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
