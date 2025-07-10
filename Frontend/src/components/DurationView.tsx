import React from 'react'

interface DurationViewProps {
    duration:number
}

function DurationView({duration}:DurationViewProps) {
    const minutes = Math.floor(duration / 60);
    const second = Math.floor(duration % 60);
  return (
    <div>
      {
        `${minutes}:${second<10?"0"+second:second}`
      }
    </div>
  )
}

export default DurationView
