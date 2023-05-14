
import { Link } from "react-router-dom";
import InputInfo from "./InputInfo";

import SignUpModal from "./SignUpModal";
import { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'
import { FirebaseError } from "firebase/app";

const Signup = () => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pass, setPass] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState(false);

  const auth = getAuth();
  const modalCheck = document.querySelector('#my-modal-6') as HTMLInputElement;

  useEffect(() => {
    if(password === confirmPassword) setPass(true);
    else setPass(false);
  }, [password, confirmPassword]);

  const handleRegister = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    try{
      if(pass && duplicateCheck){
        const user = await createUserWithEmailAndPassword(auth, email, password);
        modalCheck.click();
      } else {
        if(!pass) alert('비밀번호가 일치하지 않습니다.');
        else if(!duplicateCheck) alert('이메일 중복을 확인해주세요.');
      }
    } catch(error){
      if(error instanceof FirebaseError){
        if(error.code === 'auth/email-already-in-use'){
          alert('이미 등록된 이메일입니다');
        } else {
          console.log(error.message);
        }
      } else {
        alert(`Unexpected Error : ${error}`)
      }
    }
  };

  const handleDuplicateCheck = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        // No existing accounts with this email
        console.log('This email address is available');
        alert('사용 가능한 이메일입니다.');
        setDuplicateCheck(true);
      } else {
        // An account already exists with this email
        alert('이미 등록된 이메일입니다.');
        console.log('An account already exists with this email address');
        setDuplicateCheck(false)
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };
  
  
  return (
    
  <section className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
    <section className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/login">
                Log in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleRegister}>
              <div className="grid gap-y-4">
                {/* <InputInfo onChange={e => setName(e.target.value)} sort={name}>Name</InputInfo> */}

                <div className="flex flex-col">
                  <InputInfo onChange={e =>setEmail(e.target.value)} sort={email}>Email</InputInfo>
                  <button onClick={handleDuplicateCheck} className="btn btn-sm w-24 mt-4 self-end">중복 확인</button>
                </div>

                <InputInfo onChange={e => setPassword(e.target.value)} sort={password}>Password</InputInfo>

                <InputInfo onChange={e => setConfirmPassword(e.target.value)} sort={confirmPassword}>Confirm Password</InputInfo>

                <label htmlFor="my-modal-6"  className="">
                  <button type="submit" className="btn w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign up</button>
                </label>
              </div>
            </form>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <SignUpModal></SignUpModal>

          </div>
        </div>
      </div>
    </section>
  </section>

  );
};

export default Signup;
