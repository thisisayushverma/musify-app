import { NavLink } from 'react-router-dom'

interface IProps{
    title:string,
    icon:string,
    path?:string
}

function NavCard({title,icon,path=""}:IProps) {
  return (

    <NavLink to={path} className={({isActive})=>(`flex items-center ${isActive?"bg-[#282828]":""} justify-start gap-3 my-2 w-full hover:bg-[#282828] cursor-pointer rounded-lg p-2 px-3 `) }>
        <img className='w-7 ' src={icon} alt="" />
        <p className='text-white '>{title}</p>
    </NavLink>
  )
}

export default NavCard
