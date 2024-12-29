import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { fireDB } from './../../firebase/FirebaseConfiguration';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(fireDB, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-20 flex flex-col items-center">
      {/* Header Section */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-green-400 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>

      {/* Form & Social Links Section */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        {/* Form Section */}
        <motion.div
          className="md:w-2/3 bg-gray-900 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-2 rounded bg-green-400 hover:bg-green-300 text-black font-bold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          className="md:w-1/3 bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-green-400 mb-2">Connect with Us</h3>
          <div className="flex gap-6 text-3xl">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-all"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-all"
            >
              <FaGithub />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-all"
            >
              <FaFacebook />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
