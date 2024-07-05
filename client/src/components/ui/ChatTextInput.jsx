import { useEffect, useState } from "react"
import api from "../../utils/api"
import InputEmoji from "react-input-emoji"
import { FiPaperclip } from "react-icons/fi"
import { FiMic } from "react-icons/fi"
import { LuSendHorizonal } from "react-icons/lu"
import socket from "../../utils/sockets"

const ChatTextInput = ({ chatId, setMessage }) => {
    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(text.trim() === "") return
      
      try {
        const res = await api.post(`message/sendMessage/${chatId}`, { message: text })
        setMessage(prev => [res.data, ...prev])
        setText("")
        socket.emit("sendMessage", res.data)
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className="flex items-center gap-5 mx-5 my-3 h-[7.5vh]" >
        <div className="flex items-center w-full rounded-full gap-3 px-5 py-3 bg-inputs">
            <FiPaperclip  className="text-2xl stroke-icons hover:stroke-white cursor-pointer"/>
            <FiMic  className="text-2xl stroke-icons hover:stroke-white cursor-pointer"/>
            {/* <InputEmoji
                background="transparent"
                borderColor="transparent"
                value={text}
                color="white"
                fontSize="0.9rem"
                onChange={setText}
                keepOpened
                placeholder="Type a message here"
            /> */}
            <input 
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message here"
              className="bg-transparent border-none focus:outline-none text-white w-full" 
            />
        </div>
        <div onClick={handleSubmit} className="bg-accent p-3 rounded-full"><LuSendHorizonal className="text-2xl stroke-dark rounded-full"/></div>
    </div>
  )
}

export default ChatTextInput