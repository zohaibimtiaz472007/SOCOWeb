import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Description */}
        <div className="text-center md:text-left md:w-1/3">
          <h2 className="text-2xl font-bold text-green-400 mb-2">SOCO</h2>
          <p className="text-gray-400 text-sm">
            Empowering developers through free courses and hands-on projects. Your journey into tech starts here!
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
          <Link to="/" className="hover:text-green-400 transition-all">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400 transition-all">
            About
          </Link>
          <Link to="/projects" className="hover:text-green-400 transition-all">
            Courses
          </Link>
          <Link to="/contact" className="hover:text-green-400 transition-all">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 text-2xl">
          <Link
            to="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-all"
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-all"
          >
            <FaGithub />
          </Link>
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-all"
          >
            <FaFacebook />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-6" />

      {/* Copyright */}
      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} SOCO. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
