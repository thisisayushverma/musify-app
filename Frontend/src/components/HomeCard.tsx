import React from 'react'
import type { IHomeCardProps } from './types'

function HomeCard({name="Random Song",imgUrl="https://res.cloudinary.com/dpvnvk0ps/image/upload/v1751567530/aivcxvrdcwwcjacoxhcx.jpg",artist="Ayush",_id}:IHomeCardProps) {
  return (
    <div className='h-[15rem] w-[15rem] flex-shrink-0 cursor-pointer' >
      <img className='h-[12rem] w-full object-center' src={imgUrl}/>
      <div>
        <p className='px-2 text-md m-0 truncate text-xl font-bold text-white'>{name}</p>
        <p className='px-2 text-sm font-bold truncate  m-0 text-[#726d6d]'>{artist}</p>
      </div>
    </div>
  )
}

export default HomeCard
