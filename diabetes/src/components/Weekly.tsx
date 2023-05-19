import { useState, useEffect } from 'react'
import Datepicker from './Datepicker';
import WeekCalendar from './WeekCalendar';
import { sort } from './constants/constants';
import WeeklyChart from './WeeklyChart';
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'

const Weekly = ({sort} : {sort:sort}) => {
  const [isChart, setIsChart] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleToggle = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChart(checked);
    setIsCalendar(!checked);
  };

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };
  
  const handleCloseModal = () => {
    const button = document.querySelector('button[data-hs-overlay="#hs-slide-down-animation-modal"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
  };

  useEffect(() => {
    setIsChart(false);
    setIsCalendar(true)
  },[]);

  return(
    <>
      <div className='flex justify-between'>
        <div className="week-label font-medium flex flex-col ml-2">
          <p className='md:text-base max-md:text-sm'>
            Week of {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className='flex gap-0.5 md:hidden'>
            <div className='flex w-12'>
              <BsFileEarmarkMedical/><p className=' text-xs'>공복 혈당</p>
            </div>
            <div className='flex w-12'>
              <CiForkAndKnife/><p className=' text-xs'>섭취 칼로리</p>
            </div>
            <div className='flex w-12'>
              <MdOutlineSportsScore/><p className=' text-xs'>소모 칼로리</p>
            </div>
          </div>
        </div>
        <div className='flex justify-end md:mx-5 md:mb-2 mr-2'>
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
      </div>
      <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>
      <div className="w-full"><WeeklyChart sort={sort} date={selectedDate} isChart={isChart}></WeeklyChart></div>
      {/* {isChart && <div className="w-full border"><Graph date={selectedDate} isChart={isChart}></Graph></div>} */}
      {isCalendar && <WeekCalendar sort={sort} date={selectedDate}></WeekCalendar>}
    </>
  )
};

export default Weekly;