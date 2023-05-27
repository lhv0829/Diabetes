const TotalList = ({ name, calory} : {name:string, calory:number}) => {
  return(
    <div className="flex gap-4 justify-center">
      <div>{name}</div>
      <div>{calory}kcal</div>
    </div>
  )
};

export default TotalList;