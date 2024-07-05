import { Link } from "react-router-dom"

const ChatListUi = ({ setShowSidebar, chatId, name, avatar, lastMessage, date }) => {
  const handleClick = () => {
    setShowSidebar(false)
  }

  return (
    <Link onClick={handleClick} to={`http://localhost:5173/chat/${chatId}`} className="flex gap-3 p-3 items-center hover:bg-white/5 cursor-default">
        <img src={avatar} width="55px" height="55px" alt="chat profile picture" className="rounded-full max-lg:w-12 max-lg:h-12 mr-2" />
        <div className="w-full">
            <div className="flex justify-between items-center">
                <div className="text-lg max-lg:text-xs font-semibold">{name}</div>
                <div className="text-xs text-icons">{date}</div>
            </div>
            <div className="text-ellipsis text-sm text-icons">{lastMessage || "Send a message to start chatting"}</div>
        </div>
    </Link>
  )
}

export default ChatListUi