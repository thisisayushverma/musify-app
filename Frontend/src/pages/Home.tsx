import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const user = useSelector((state: any) => state.user)
  console.log("user from home",user);
  
  return (
    <div className='text-white'>
      Home Page
      {
        user.isAuthenticated?(<p className='text-white'>{user?.user?.name}</p>):null
      }
    </div>
  )
}

export default Home
