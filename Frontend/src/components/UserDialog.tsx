import React from 'react'
import { handleLogout } from '../features/auth'
import config from '../config/config';

function UserDialog() {
  const logoutFunc = async () => {
    const response = await handleLogout();
    console.log(response);
    if(response.status >=200 && response.status < 300){
      localStorage.setItem(config.userAuthLocalStorageKey,'');
      localStorage.setItem(config.userDataLocalStorageKey,'');
      window.location.reload();
    }
  }
  return (
    <div className='dialog-box  w-[10rem] bg-[#303030] py-2'>
      <button className='w-full text-left py-2 px-3 bg-red-800 font-semibold text-xl cursor-pointer' onClick={logoutFunc}>Logout</button>
    </div>
  )
}

export default UserDialog
