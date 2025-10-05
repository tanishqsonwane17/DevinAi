import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/Axios";
import { motion } from "framer-motion";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/projects/all")
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center px-6 py-10 text-white">

      {/* 🔹 AI Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000cc] via-[#000000b0] to-[#000000f5] backdrop-blur-[2px]"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-semibold mb-10 tracking-wide text-[#f5f5f5]"
      >
        Your <span className="text-[#00f6ff]">Projects</span>
      </motion.h1>

      {/* New Project Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-10"
      >
        <Link
          to="/create-project"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a1a1a]/60 border border-[#333] hover:border-[#00f6ff66] hover:shadow-[0_0_15px_#00f6ff33] transition-all font-medium backdrop-blur-md"
        >
          <FaPlus className="text-[#00f6ff]" />
          Create New Project
        </Link>
      </motion.div>

      {/* Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10"
      >
        {projects?.length > 0 ? (
          projects.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/project`, { state: { project: item } })}
              className="group p-6 bg-[#ffffff0a] border border-[#2a2a2a] rounded-2xl hover:border-[#00f6ff66] hover:shadow-[0_0_20px_#00f6ff22] transition-all cursor-pointer backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MdPeopleAlt className="text-[#00f6ff]" />
                <span>Collaborators:</span>
                <span className="text-white font-medium">
                  {item.users?.length || 0}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center mt-10">
            No projects yet. Create your first one.
          </p>
        )}
      </motion.div>

      {/* Footer */}
      <p className="text-gray-500 text-xs mt-16 tracking-wide z-10">
        <span className="text-[#00f6ff]">Devin</span> — AI Workspace Environment
      </p>
    </main>
  );
};

export default Home;
