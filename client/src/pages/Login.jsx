import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { Link } from "react-router-dom"
import api from "../utils/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/user/login", formData)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-full bg-secondary grid grid-cols-2 max-md:grid-cols-1"> 
        <div className="h-full overflow-hidden flex items-center justify-center p-10 max-md:hidden">
          <img className="h-full object-contain" src="./login.jpg"/>
        </div>
        <div className="py-24 px-10">
            <Link to="/" className="flex gap-3 items-center">
              <IoIosArrowBack className="inline-block" /> <span to="/">Back to website</span>
            </Link>
            <div className="text-3xl font-semibold mt-10">Welcome!</div>
            <div className="text-sm mt-3">
              <span className="font-bold underline cursor-pointer">Create a free account</span> or login to get started
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-10">
              <label htmlFor="email" className="ml-3">Email</label>
              <input 
                autoComplete="off" 
                id="email" type="text" 
                className="bg-transparent ring-2 ring-black focus:ring-white w-[80%] max-sm:w-[90%] rounded-full py-3 px-6 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email"
              />
              <label htmlFor="password" className="mt-4 ml-3">Password</label>
              <input 
                id="password" type="password" 
                className="bg-transparent ring-2 ring-black focus:ring-white w-[80%] max-sm:w-[90%] rounded-full py-3 px-6 outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
              />
              <div className="underline mt-2 ml-3">forgot password?</div>
              <button className="w-[80%] max-sm:w-[90%] mt-4 rounded-full p-3 bg-black text-white">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login