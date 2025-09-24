import React, { useState, useContext } from 'react'
import { UserContext } from '../context/User.contenxt'
import { useNavigate, NavLink } from 'react-router-dom'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axiosInstance from '../config/Axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axiosInstance.post('/users/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
        navigate('/')
      }).catch((error) => {
        console.error(error.response?.data || error.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white  to-black">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#202020af] to-[#3f3f3f73] shadow-2xl rounded-2xl p-8 w-full max-w-md border border-black"
      >
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#626260] mb-8 text-center animate-pulse">
          Sign in to your account
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: '' }}
              className="w-full px-4 py-3 rounded-lg text-white border border-[#e6e6e6a8] focus:outline-none transition-colors duration-200"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#' }}
                className="w-full px-4 py-3 rounded-lg text-white border border-[#e6e6e6a8] focus:outline-none pr-10 transition-colors duration-200"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEyeClosed size={22}/> : <VscEye size={22}/>}
              </button>
            </div>
          </div>

          {/* Submit button */}
         <motion.button
  whileHover={{ scale: 1.05, backgroundColor: '', color: '' }}
  whileTap={{ scale: 0.95 }}
  type="submit"
  className="w-full py-3 rounded-xl text-[18px] bg-[#4f4f4f] hover:bg-[#7b7b7b] cursor-pointer text-white font-semibold transition-colors duration-300"
>
  Sign in
</motion.button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-300">
          Don't have an account?{' '}
          <NavLink 
            to={'/register'} 
            className="text-[#f7f7f7] underline font-medium transition-colors"
          >
            Create a new account
          </NavLink>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
