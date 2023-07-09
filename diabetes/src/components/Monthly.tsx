import { useState, useEffect } from 'react'
import CustomCalendar from './CustomCalendar';
import { sort } from './constants/constants';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { Calendar } from 'primereact/calendar';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import MonthlyChart from './MonthlyChart';
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'

const Monthly = ({ sort } : {sort : sort}) => {
  const [isChart, setIsChart] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleToggle = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChart(checked);
    setIsCalendar(!checked);
  };

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };

    const handlePreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    setSelectedDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    setSelectedDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  useEffect(() => {
    setIsChart(false);
    setIsCalendar(true)
  },[]);

  return(
    <>
      <div className='flex max-md:justify-between max-md:mx-2 justify-end mx-5 mb-2'>
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
      {isChart && 
        <div className="header flex justify-center gap-8 p-4 border-b">
          <button className="previous-month text-2xl text-blue-800" onClick={handlePreviousMonth}>
            <BiCaretLeft></BiCaretLeft>
          </button>
          <div className='flex bg-white'>
            <Calendar value={date} onChange={(e) => handleDateChange(e.target.value as Date)} view="month" dateFormat="mm/yy" />
          </div>
          {/* <div className="month-year text-lg font-medium">
            <h2>
              {date.getFullYear()} {monthNames[date.getMonth()]} 
            </h2>
          </div> */}
          <button className="next-month text-2xl text-blue-800" onClick={handleNextMonth}>
            <BiCaretRight></BiCaretRight>
          </button>
        </div>
      }
      {/* {isChart && <Datepicker date={selectedDate} onDateChange={handleDateChange}></Datepicker>} */}
      <div className="w-full"><MonthlyChart sort={sort} date={selectedDate} isChart={isChart}></MonthlyChart></div>
      {isCalendar && <CustomCalendar sort={sort} onDateChange={handleDateChange}></CustomCalendar>}
    </>
  )
};
export default Monthly;