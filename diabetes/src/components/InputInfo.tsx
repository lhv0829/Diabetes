import { ChangeEvent } from "react";
import { useState, useEffect } from "react";

interface InputInfoProps {
  children: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sort: string;
}

const InputInfo = ({ children, onChange, sort }: InputInfoProps) => {

  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (!isSorted && sort !== '') {
      setIsSorted(true);
    }
  }, [sort, isSorted]);

  const type = children === 'Name' ? 'text' : (children === 'Email' ? 'email' : 'password');
  const kind = children === 'Name' ? 'name' : (children === 'Email' ? 'email' : (children === 'Confirm Password'? 'confirm-password' : 'password'));

  return(
    <div>
      <label htmlFor={kind} className="block text-sm mb-2 dark:text-white">{children}</label>
      <div className="relative">
        <input type={type} id={kind} name={kind} value={sort} onChange={onChange} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required/>
      </div>
    </div>
  )
};

export default InputInfo;