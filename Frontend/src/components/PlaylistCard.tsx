import React from 'react'

interface IProps{
    title:string
}
function PlaylistCard({title="Kill This Love"}:IProps) {
  return (
    <div className='flex items-center justify-start text-white w-full hover:bg-[#282828] cursor-pointer rounded-lg py-1 px-3'>
      {title}
    </div>
  )
}

export default PlaylistCard
