import React from "react";
import { motion } from "framer-motion";
import logo from './../../assets/SOCO.png';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-green-400 border-t-transparent rounded-full"></div>
        
        {/* Logo or Text */}
        <div className="absolute flex items-center justify-center">
          <span className="text-2xl font-bold text-white">SOCO</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
