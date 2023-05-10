import axios from "axios";
import { useState } from "react";
import { API_KEY, APP_ID } from "./constants/constants";

const CheckAPI = () => {
  const [searchResults, setSearchResults] = useState([]);
  axios.get(`https://api.nutritionix.com/v1_1/search/q=banana?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat&appId=${APP_ID}&appKey=${API_KEY}`)
     .then(response => {
         setSearchResults(response.data.hits);
        //  console.log(response.data.hits);
     })
     .catch(error => {
         console.log(error);
     });

return (
     <div>
         {searchResults.map(result => (
             <div key={result.fields.item_id}>
                 <p>{result.fields.item_name}</p>
                 <p>{result.fields.brand_name}</p>
                 <p>{result.fields.nf_calories} calories</p>
                 <p>{result.fields.nf_total_fat}g fat</p>
             </div>
         ))}
     </div>
);
};

export default CheckAPI;