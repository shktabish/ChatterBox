import { useContext, useEffect, useRef, useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import ChatListUi from './ui/ChatListUi'
import api from '../utils/api'
import { getUser } from "../utils/chat.util"
import moment from 'moment'
import { UserContext } from "../contexts/UserContext"
import socket from "../utils/sockets"

const ChatList = ({ setShowSidebar, showSidebar }) => {
    const [search, setSearch] = useState("") 
    const [loading, setLoading] = useState(true)
    const [chat, setChat] = useState([])
    const user = useContext(UserContext)
    const hasJoinedSocket = useRef(false)

    useEffect(() => {
        if (!user) return

        const fetchChats = async () => {
            try {
                const res = await api.get("/chat/getAllChats")
                setChat(res.data.chats)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchChats()

        if (!hasJoinedSocket.current) {  
            socket.emit("join", user._id)
            hasJoinedSocket.current = true  
        }

        socket.on("receiveMessage", async (msg) => {
            const res = await api.get("/chat/getAllChats")
            setChat(res.data.chats)
        })

        socket.on("updateLastMessage", async (message) => {
            const res = await api.get("/chat/getAllChats")
            setChat(res.data.chats)
        })
    }, [user])

    return (
        <div className={`w-80 max-lg:w-60 max-md:w-full ml-5 h-[calc(100vh-40px)] flex flex-col ${showSidebar ? "" : "max-md:grow"}`}>
            <div className="flex items-center px-4 py-3 bg-inputs rounded-xl shadow-md">
                <IoSearchOutline className="text-2xl max-lg:text-lg stroke-icons mr-2" />
                <input
                    className="bg-transparent border-none focus:outline-none grow text-lg"
                    value={search}
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                />
            </div>
            {
                loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="grow mt-5 bg-secondary rounded-xl shadow-md">
                        <div className="text-xl font-semibold ml-3 mt-3 mb-2">People</div>
                        {
                            chat.map((chat) => {
                                const otherUser = getUser(chat.users, user._id)
                                return (
                                    <ChatListUi setShowSidebar={setShowSidebar} key={chat._id} chatId={chat._id} name={otherUser.name} avatar={otherUser.avatar} lastMessage={chat.lastMessage?.message || "Send a message to start talking"} date={moment(chat.updatedAt).format('DD-MM-YYYY')}/>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ChatList
