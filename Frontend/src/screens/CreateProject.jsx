import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../config/Axios'
import { motion } from 'framer-motion'

const CreateProject = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const res = await axiosInstance.post(
        '/projects/create',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log(res.data)
      navigate('/') 
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-[#323232]'>

      {/* Card */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md p-8 bg-[#414141] rounded-2xl shadow-2xl border border-[#e6e6e6]'
      >
        <h2 className='text-3xl text-center font-bold text-white mb-6'>
          Create Project
        </h2>

        <motion.input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Project name'
          whileFocus={{ scale: 1.02, borderColor: '' }}
          className='w-full px-4 py-3 rounded-lg border border-[#e6e6e6a8] bg-transparent text-white focus:outline-none transition-colors mb-5'
        />

        <motion.button
          onClick={handleCreateProject}
          whileHover={{ scale: 1.05, cursor:'pointer' }}
          whileTap={{ scale: 0.95 }}
          className='w-full py-3 rounded-xl bg-[#323232] border border-[#e6e6e6] text-white font-semibold transition-all'
        >
          Create Project
        </motion.button>
      </motion.div>
    </div>
  )
}

export default CreateProject
