import SidebarIcons from "./SidebarIcons"
import ChatList from "./ChatList"

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  return (
    <div className={`h-screen p-5 flex ${showSidebar ? "max-md:w-screen" : "max-md:hidden"}`}>
      <SidebarIcons />
      <ChatList setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
    </div>
  )
}

export default Sidebar