import React, { useState } from 'react'
import whiteHeart from "../assets/whiteHeart.svg"
import greenHeart from "../assets/greenHeart.svg"
function ToggleIcon() {
  const [heart, setHeart] = useState(false)
  return (
    <div>
      <img src={heart ? greenHeart : whiteHeart} onClick={() => setHeart((prev)=> !prev)} alt="" />
    </div>
  )
}

export default ToggleIcon
