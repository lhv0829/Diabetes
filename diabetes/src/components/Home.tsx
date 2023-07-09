import { Link } from "react-router-dom";
import { BsFileEarmarkMedical } from 'react-icons/bs'
import { CiForkAndKnife } from 'react-icons/Ci'
import { MdOutlineSportsScore } from 'react-icons/md'
import { AiOutlineDatabase } from 'react-icons/ai'

const Home = () => {
  const isLogin = localStorage.getItem('isLogin') === 'true';

  return(
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-10 mx-8 h-5/6">
      <Link to={`${isLogin ? '/bloodsugar' : '/login'}`} className="border rounded-md flex justify-center">
        <h3 className="my-6 text-3xl font-bold flex gap-2 items-center text-gray-800 dark:text-gray-200">
          <BsFileEarmarkMedical/>공복 혈당
        </h3>
      </Link>
      <Link to={`${isLogin ? '/diet' : '/login'}`} className="border rounded-md flex justify-center">
        <h3 className="my-6 text-3xl font-bold flex gap-2 items-center text-gray-800 dark:text-gray-200">
          <CiForkAndKnife/>식단
        </h3>
      </Link>
      <Link to={`${isLogin ? '/exercise' : '/login'}`} className="border rounded-md flex justify-center">
        <h3 className="my-6 text-3xl font-bold flex gap-2 items-center text-gray-800 dark:text-gray-200">
          <MdOutlineSportsScore/>운동
        </h3>
      </Link>
      <Link to={`${isLogin ? '/total' : '/login'}`} className="border rounded-md flex justify-center">
        <h3 className="my-6 text-3xl font-bold flex gap-2 items-center text-gray-800 dark:text-gray-200">
          <AiOutlineDatabase/>종합
        </h3>
      </Link>
    </div>
  )
};

export default Home;