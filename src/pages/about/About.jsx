import React from 'react';
import { FaCode, FaGamepad, FaPython, FaRobot, FaCogs, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const courses = [
    { id: 1, title: 'Web Development', icon: <FaCode />, description: 'Learn modern web development with HTML, CSS, JavaScript, and frameworks like React and Angular.' },
    { id: 2, title: 'Game Development', icon: <FaGamepad />, description: 'Build engaging games using engines like Unity and Unreal Engine.' },
    { id: 3, title: 'Python Programming', icon: <FaPython />, description: 'Master Python for automation, web development, and more.' },
    { id: 4, title: 'Machine Learning', icon: <FaRobot />, description: 'Understand machine learning concepts and build AI models.' },
    { id: 5, title: 'C++ Programming', icon: <FaCogs />, description: 'Dive deep into C++ for system programming and game development.' },
    { id: 6, title: 'Data Structures & Algorithms', icon: <FaDatabase />, description: 'Enhance problem-solving skills with DSA.' }
  ];

  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400">About Us</h1>
        <p className="text-gray-300 mt-4">
          At <span className="text-green-400">SOCO</span>, we provide top-notch coding courses to help you become a skilled developer.
        </p>
      </div>

      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-all">
            <div className="text-green-400 text-5xl mb-4">{course.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-400 text-sm">{course.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-300">Join us today and start your journey in tech!</p>
        <Link to = {'/projects'} >
        <button className="mt-4 bg-green-400 text-black px-6 py-2 rounded-md font-medium hover:bg-green-300 transition-all">
          Get Started
        </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
