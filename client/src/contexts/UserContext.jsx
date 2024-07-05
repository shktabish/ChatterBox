import React, { createContext, useState, useEffect } from 'react'
import api from '../utils/api'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api('/user/me')
        setCurrentUser(res.data.user)
      } catch (error) {
        console.error(error)    
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
