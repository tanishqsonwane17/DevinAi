import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/Axios";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const CreateProject = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    if (!name.trim()) return alert("Please enter a project name!");
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/projects/create",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#0a0a0a] text-white relative overflow-hidden px-4">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#111] to-[#141414]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f6ff1a] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0072ff1a] rounded-full blur-3xl" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-[#111111]/70 border border-[#1f1f1f] backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_#00c6ff22] p-8 relative z-10"
      >
        {/* AI Glow Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-4xl font-extrabold mb-8"
        >
          <span className="bg-gradient-to-r from-[#00f6ff] to-[#0072ff] bg-clip-text text-transparent tracking-wide">
            Initialize Project
          </span>
        </motion.h1>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative mb-6"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name your AI workspace..."
            className="w-full bg-transparent border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f6ff] transition-all"
          />
          <div className="absolute right-3 top-3 text-[#00f6ff] opacity-60">
            <Sparkles size={20} />
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={handleCreateProject}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white tracking-wide transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-[#1a1a1a] border border-[#333] cursor-not-allowed"
              : "bg-gradient-to-r from-[#00f6ff] to-[#0072ff] hover:shadow-[0_0_20px_#00f6ff55]"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Initializing...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Initialize
            </>
          )}
        </motion.button>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 mt-6 text-sm tracking-wide"
        >
          “Empowering your next build with AI precision.”
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CreateProject;
