import React from 'react';
import logo from '../../assets/SOCO.png';
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-20 py-10 gap-8">
      {/* Left Side: Text Content */}
      <div className="text-center md:text-left md:w-1/2 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-green-400">SOCO</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed">
          Unlock the power of coding with <span className="text-green-400">Free Courses</span> and hands-on projects.
        </p>
        <div>
        <Link to = {'/projects'} >
          <button className="bg-green-400 text-black px-6 py-2 rounded-md font-medium hover:bg-green-300 transition-all">
            Get Started
          </button>
        </Link>
        </div>
      </div>

      {/* Right Side: Logo */}
      <div className="flex justify-center md:w-1/2">
        <img
          src={logo}
          alt="SOCO Logo"
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full object-cover border-4 border-green-400 shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
