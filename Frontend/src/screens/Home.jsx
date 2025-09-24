import React, { useState, useEffect } from 'react'
import { FaLink } from "react-icons/fa6"
import { MdPeopleAlt } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../config/Axios'
import { motion } from 'framer-motion'

const Home = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/projects/all')
      .then((res) => {
        setProjects(res.data.projects)
      })
      .catch((err) => {
        console.error("Error fetching projects:", err)
      })
  }, [])

  return (
    <main className='p-6 min-h-screen w-full bg-gradient-to-r from-[#202020] to-[#323232]'>
      <div className="flex flex-wrap gap-6">
        {/* New Project Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-4 bg-[#414141] border border-[#e6e6e6] rounded-xl text-white cursor-pointer transition-all"
        >
          <Link to={'/create-project'} className='text-md font-semibold'>New Project</Link>
          <FaLink />
        </motion.button>

        {/* Project Cards */}
        {projects?.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03}}
            onClick={() => navigate(`/project`, { state: { project: item } })}
            className="flex flex-col gap-3 p-6 bg-[#414141] border border-[#e6e6e6] rounded-xl text-white cursor-pointer transition-all"
          >
            <h2 className='text-lg font-semibold'>{item.name}</h2>
            <div className='flex items-center gap-2'>
              <MdPeopleAlt className='mt-1 text-sm' />
              <small className='text-sm'>Collaborators:</small>
              <span className='text-md font-medium'>{item.users?.length || 0}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}

export default Home
