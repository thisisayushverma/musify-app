import React from 'react'
import coverImg from "../../assets/coverMusic.png"
function MusicCard({title,artist}) {
  return (
    <div className='w-fit  font-manrope flex justify-between items-center gap-3 '>
      <img src={coverImg} alt="" className='rounded-md'/>
      <div >
        <p className='text-TextP font-bold'>{title}</p>
        <p className='text-TextS'>{artist}</p>
      </div>
    </div>
  )
}

export default MusicCard
