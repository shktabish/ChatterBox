import { PiChatCircleDotsLight } from "react-icons/pi"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { CiSettings } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const SidebarIcons = () => {
  const user = useContext(UserContext)

  return (
    <div className='flex flex-col items-center justify-start bg-dark h-[calc(100vh-40px)] w-20 rounded-xl'>
        <img src={user?.avatar} alt="users profile picture"  className='w-14 h-w-14 rounded-full mt-4 mb-8'/>
        <PiChatCircleDotsLight className='text-4xl my-4 fill-icons hover:fill-accent cursor-pointer transition-all'/>
        <HiOutlineUserGroup className='text-4xl my-4 stroke-icons hover:stroke-accent cursor-pointer transition-all'/>
        <CiSettings className='text-4xl my-4 mb-auto fill-icons hover:fill-accent cursor-pointer transition-all'/>
        <IoLogOutOutline className='text-4xl my-4 ml-2 stroke-icons hover:stroke-accent cursor-pointer transition-all'/>
    </div>
  )
}

export default SidebarIcons