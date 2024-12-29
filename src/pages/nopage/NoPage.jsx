import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-6">Page Not Found</p>
        <p className="text-lg md:text-xl text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        
        <Link to="/">
          <motion.a 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Go Back Home
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
};

export default NoPage;
