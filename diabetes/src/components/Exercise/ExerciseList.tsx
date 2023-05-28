import { useState } from "react";
import { BsTrash } from 'react-icons/bs'

const ExerciseList = ({name, calory, idx, onDelete} : {name:string, calory:number, idx:number, onDelete:(idx:number) => void}) => {
  const [isdelete, setIsDelete] = useState(false);

  const showDeleteButton = () => {
    setIsDelete(true);
  };

  const removeDeleteButton = () => {
    setIsDelete(false);
  };

  const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete(idx);
  };

  return(
    <div className='flex w-full justify-evenly border text-base mt-3' 
      onMouseOver={showDeleteButton}
      onMouseOut={removeDeleteButton}>
      <div className='w-full text-center'>{name}</div>
      <div className='w-full text-center'>{calory !== null ? calory : 0}</div>
      {isdelete && <button onClick={handleDelete} className="inline-block absolute right-1"><BsTrash/></button>}
    </div>
  )
};

export default ExerciseList;
