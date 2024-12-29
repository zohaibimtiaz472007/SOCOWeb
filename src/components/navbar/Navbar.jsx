import React, { useState } from "react";
import { FaHome, FaUser, FaEnvelope, FaProjectDiagram } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from '../../assets/SOCO.png'; // Replace this with your SOCO logo path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const admin = localStorage.getItem("admin");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to={'/'}>
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-12 rounded-full border-2 border-green-400" alt="SOCO Logo" />
            <span className="text-2xl font-bold text-green-400">SOCO</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
            <FaHome />
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
            <FaUser />
            <Link to="/about">About</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
            <FaProjectDiagram />
            <Link to="/projects">Courses</Link>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
            <FaEnvelope />
            <Link to="/contact">Contact</Link>
          </li>
          {admin ? (
            <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
              <RiAdminFill />
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : null}
          {!admin ? (
            <Link to={"/login"}>
              <button className="bg-green-400 text-black px-4 py-2 rounded-md hover:bg-green-300 transition-all">
                Login
              </button>
            </Link>
          ) : null}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Menu">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black mt-4 p-4 rounded-lg shadow-md">
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
              <FaHome />
              <Link to="/">Home</Link>
            </li>
            <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
              <FaUser />
              <Link to="/about">About</Link>
            </li>
            <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
              <FaProjectDiagram />
              <Link to="/projects">Courses</Link>
            </li>
            <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
              <FaEnvelope />
              <Link to="/contact">Contact</Link>
            </li>
            {admin ? (
              <li className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                <RiAdminFill />
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : null}
            {!admin ? (
              <Link to={"/login"}>
                <button className="bg-green-400 text-black px-4 py-2 rounded-md hover:bg-green-300 transition-all">
                  Login
                </button>
              </Link>
            ) : null}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
