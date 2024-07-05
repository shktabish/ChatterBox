import ChatSpace from "../components/ChatSpace.jsx"
import { Route, Routes } from 'react-router-dom';
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="h-screen w-full bg-primary ">
        <div className="flex">
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Routes> 
              <Route path="/" element={<div>This works</div>}/>
              <Route path="/:chatId" element={<ChatSpace showSidebar={showSidebar} />} />  
            </Routes>
        </div>
    </div>
  )
}

export default Home