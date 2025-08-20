import React from 'react'
import type { IHomeListProps } from "./types"
import HomeCard from './HomeCard'

function HomeList({name,list}:IHomeListProps) {

  return (
    <div className='w-full  p-1'>
      <div className='flex justify-between p-2'>
        <p className='text-2xl font-bold'>
            {name}
        </p>
        <p className='font-bold text-[#726d6d] hover:underline cursor-pointer'>
            Show all
        </p>
      </div>
      <div className='flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth'>
        {
            list.map((item)=>{
                return(
                    <HomeCard key={item._id} _id={item._id} name={item.name} imgUrl={item.imgUrl} artist={item.artist} />
                )
            })
        }
      </div>
    </div>
  )
}

export default HomeList
