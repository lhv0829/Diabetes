import { useState, useEffect } from 'react'
import WeekCalendar from './WeekCalendar';
import Datepicker from './Datepicker';
import Graph from './Graph';
import Week from './Week';

const Weekly = () => {
  const [isChart, setIsChart] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleToggle = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChart(checked);
    setIsCalendar(!checked);
  };

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
    };

  useEffect(() => {
    setIsChart(false);
    setIsCalendar(true)
  },[]);
  useEffect(() => {
    console.log(isChart);
  },[isChart]);
  return(
    <>
      <div className='flex justify-end mx-5 mb-2'>
        <div className="flex items-center">
          <label className="text-sm text-gray-500 mr-3 dark:text-gray-400">Calendar</label>
            <input 
              type="checkbox" 
              id="hs-basic-with-description" 
              className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800
              before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
              checked={isChart}
              onChange={handleToggle}/>
            <label className="text-sm text-gray-500 ml-3 dark:text-gray-400">Chart</label>
          </div>
      </div>
      <div className="week-label font-medium">
        Week of {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
      <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>
      <div className="w-full border"><Graph date={selectedDate} isChart={isChart}></Graph></div>
      {/* {isChart && <div className="w-full border"><Graph date={selectedDate} isChart={isChart}></Graph></div>} */}
      {isCalendar && <Week date={selectedDate}></Week>}
    </>
  )
};

export default Weekly;