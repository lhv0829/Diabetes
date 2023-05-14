import CustomCalendar from "../CustomCalendar";
import { useState, useEffect } from 'react'

const Exercise = () => {
  const [isChart, setIsChart] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);

  const handleToggle = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChart(!checked);
    setIsCalendar(checked);
  };
  useEffect(() => {
    setIsChart(true);
  },[]);
  return(
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 w-16 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
            일간
          </button>
          <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 w-16" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
            주간
          </button>
          <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 w-16" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
            월간
          </button>
        </nav>
      </div>

      <div className="mt-3">
        <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
          <p className="text-gray-500 dark:text-gray-400">
            This is the <em className="font-semibold text-gray-800 dark:text-gray-200">first</em> item's tab body.
          </p>
        </div>
        <div id="tabs-with-underline-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
          <p className="text-gray-500 dark:text-gray-400">
            This is the <em className="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
          </p>
        </div>
        <div id="tabs-with-underline-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
          <div className="flex items-center">
            <label className="text-sm text-gray-500 mr-3 dark:text-gray-400">Chart</label>
            <input 
              type="checkbox" 
              id="hs-basic-with-description" 
              className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800
              before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
              checked={isCalendar}
              onChange={handleToggle}/>
            <label className="text-sm text-gray-500 ml-3 dark:text-gray-400">Calendar</label>
          </div>
          {isChart && <div className="w-full h-12 border">CHART</div>}
          {isCalendar && <CustomCalendar kind="exercise"></CustomCalendar>}
        </div>
      </div>
    </>
  )
};

export default Exercise;