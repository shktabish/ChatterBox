import { IoPersonOutline } from "react-icons/io5"

const Navbar = () => {
  return (
    <div className="flex items-center gap-5 px-5 h-[10vh]">
        <div className="mr-auto text-2xl font-semibold">Chatter<span className="text-[#36D55E]">Box</span></div>
        <IoPersonOutline stroke="#768085" className="text-3xl" />
        <div className="flex items-center gap-2 px-3 py-2 pr-16 rounded-full" style={{border: "1px solid #262B2E"}}>
          <img src="./myPicture.jpg" alt="profile picture" width="40px" height="40px" className="rounded-full" />
          <div>Tabish Shaikh</div>
        </div>
    </div>
  )
}

export default Navbar