import { useState } from "react";
import { BsTrash } from 'react-icons/bs'

const FoodList = ({name, calory} : {name:string, calory:number}) => {
  const [isdelete, setIsDelete] = useState(false);

  const handleDeleteButton = () => {
    setIsDelete(true);
  };

  const removeDeleteButton = () => {
    setIsDelete(false);
  };

  return(
    <div className='flex w-full justify-evenly text-base mt-3' 
      onMouseOver={handleDeleteButton}
      onMouseOut={removeDeleteButton}>
      <div className='w-full text-center'>{name}</div>
      <div className='w-full text-center'>{calory !== null ? calory : 0}</div>
      {isdelete && <button className="inline-block absolute right-1"><BsTrash/></button>}
    </div>
  )
};

export default FoodList;
