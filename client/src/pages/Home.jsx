import { useState } from "react"

const Home = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

  return (
    <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <form className="flex flex-col gap-10">
            <label className="relative">
            <input 
                className="bg-transparent ring-2 ring-inputs w-80 rounded-md text-white px-5 py-3 outline-none focus:ring-2 focus:ring-white transition-all duration-200 cursor-text"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
                type="text" 
            />
            <span className="input-text absolute -top-3 left-0 px-4 py-2 text-lg font-semibold transition-all duration-200 cursor-text">Email</span>
            </label>
            <label className="relative">
            <input 
                className="bg-transparent ring-2 ring-inputs w-80 rounded-md text-white px-5 py-3 outline-none focus:ring-2 focus:ring-white transition-all duration-200 cursor-text"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
                type="text" 
            />
            <span className="input-text absolute -top-3 left-0 px-4 py-2 text-lg font-semibold transition-all duration-200 cursor-text">Password</span>
            </label>
        </form>
    </div>
  )
}

export default Home