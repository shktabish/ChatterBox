import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import api from '../utils/api'
import ChatTextInput from './ui/ChatTextInput'
import { getUser } from '../utils/chat.util'
import { IoCallOutline } from "react-icons/io5"
import { PiVideoCameraLight } from "react-icons/pi"
import { IoMdMore } from "react-icons/io"
import socket from '../utils/sockets'

const ChatSpace = ({ showSidebar }) => {
  const { chatId } = useParams()
  const user = useContext(UserContext)
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(true)
  const [receiver, setReceiver] = useState({})

  useEffect(() => {
    const fetchMessages = async () => {
      if(!user) return

      try {
        const res = await api.get(`message/getMessages/${chatId}`)
        const chatRes = await api.get(`chat/getChat/${chatId}`)
        
        setMessage(res.data)
        setReceiver(getUser(chatRes.data.chat.users, user._id))

        socket.on("receiveMessage", (msg) => {
          setMessage(prev => [msg, ...prev])
        })

        return () => {
          socket.off("receiveMessage", handleReceiveMessage)
        }
      } catch (error) {
        console.error(error)  
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    socket.emit("joinChat", chatId)
  }, [chatId, user])

  return (
    <div className={`${showSidebar ? "max-md:hidden" : "max-md:block max-md:ml-5"} h-[calc(100vh-40px)] my-5 mr-5 w-full bg-secondary rounded-xl shadow-md relative`}>
      {
        loading ? (
          <div className='flex justify-center items-center h-full'>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='h-full flex flex-col'>
            <div className='flex items-center gap-4 px-5 py-4 bg-dark rounded-t-xl' >
              <img src={receiver.avatar} alt="chats profile picture" className='w-10 h-w-10 rounded-full' />
              <div className='font-semibold mr-auto'>{receiver.name}</div>
              <IoCallOutline className='text-2xl mr-2 stroke-icons hover:stroke-accent cursor-pointer' />
              <PiVideoCameraLight className='text-3xl mr-2 fill-icons hover:fill-accent cursor-pointer' />
              <IoMdMore className='text-3xl fill-icons hover:fill-accent cursor-pointer' />
            </div>
            <div className='grow flex flex-col-reverse overflow-y-scroll'>
              {
                message.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'} px-5 py-2`}>
                    <div className={`px-4 py-2 rounded-xl ${msg.sender._id === user._id ? 'bg-[#B785F6] rounded-br-none' : 'bg-inputs rounded-bl-none'}`}>
                      {msg.message}
                    </div>
                  </div>
                ))
              }
            </div>
            <ChatTextInput chatId={chatId} setMessage={setMessage} />
          </div>
        )
      }
    </div>
  )
}

export default ChatSpace