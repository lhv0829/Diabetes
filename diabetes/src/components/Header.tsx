import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { loginState } from "../atom/loginState";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react'

const Header = () => {
  const initialLoginState = localStorage.getItem('isLogin') === 'true';
  // const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const navigate = useNavigate();

  const auth = getAuth();

  const handleLogout = async (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try{
        auth.signOut();
        navigate('/');
        setIsLogin(false);
        localStorage.setItem('isLogin', 'false');
        localStorage.removeItem('Email');
    } catch(error){
        alert(`Unexpected Error : ${error}`)
    }
  };


  useEffect(() => {
    const checkLoginState = () => {
      if(auth.currentUser){
        setIsLogin(true);
        localStorage.setItem('isLogin', 'true');
      } else {
        setIsLogin(false);
        localStorage.setItem('isLogin', 'true');
      }
    };
  
    checkLoginState();
  
    // auth.currentUser가 변경될 때마다 상태를 업데이트합니다.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkLoginState();
    });
  
    return () => {
      unsubscribe();
    };
  }, [auth.currentUser, setIsLogin]);

  return(
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-blue-600 border-b border-white/[.5] text-sm py-3 sm:py-0">
      <nav className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold text-white" href="#" aria-label="Brand">Brand</a>
          <div className="sm:hidden">
            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border border-white/[.5] font-medium text-white/[.5] shadow-sm align-middle hover:bg-white/[.1] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
              <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            <Link className="font-medium text-white/[.8] hover:text-white sm:py-6" to="/">홈</Link>
            <Link className="font-medium text-white/[.8] hover:text-white sm:py-6" to={`${isLogin ? '/bloodsugar' : '/login'}`}>혈당</Link>
            <Link className="font-medium text-white/[.8] hover:text-white sm:py-6" to={`${isLogin ? '/diet' : '/login'}`}>식단</Link>
            <Link className="font-medium text-white/[.8] hover:text-white sm:py-6" to={`${isLogin ? '/exercise' : '/login'}`}>운동</Link>
            <Link className="font-medium text-white/[.8] hover:text-white sm:py-6" to={`${isLogin ? '/total' : '/login'}`}>종합</Link>

            {
              isLogin ?
              (<Link onClick={handleLogout} className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-l sm:border-white/[.3] sm:my-6 sm:pl-6" to={'/'}>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Log out
              </Link>
              ) : (
              <Link className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-l sm:border-white/[.3] sm:my-6 sm:pl-6" to="/login">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Log in
              </Link> )
            }

          </div>
        </div>
      </nav>
    </header>
  )
};

export default Header;