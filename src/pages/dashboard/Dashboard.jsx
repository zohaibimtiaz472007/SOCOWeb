import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/myContext';
import { Link, useNavigate } from 'react-router-dom';
import { fireDB } from './../../firebase/FirebaseConfiguration';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import toast from "react-hot-toast";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, deleteBlogs } = context;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'messages'
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "contacts"));
        const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(contacts);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
    fetchUserData();
  }, []);

  const deleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(fireDB, "contacts", messageId));
      setMessages(messages.filter(msg => msg.id !== messageId));
      toast.success("Message deleted");
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-white">
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src={user.profileImage || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
              alt="profile"
            />
          </div>
          <div className="right text-center lg:text-left">
            <div className="flex gap-2 mt-4 justify-center lg:justify-start">
              <Link to="/createblog">
                <button className="px-8 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-white">
                  Add Project
                </button>
              </Link>
              <button
                onClick={logout}
                className="px-8 py-2 rounded-md bg-red-600 hover:bg-red-500 transition text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 max-w-7xl mb-6">
          <div className="flex gap-4 border-b border-gray-600">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-white border-b-2 border-pink-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'text-white border-b-2 border-pink-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Messages
            </button>
          </div>
        </div>

        {activeTab === 'projects' ? (
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="relative overflow-x-auto shadow-lg sm:rounded-xl">
              <table className="w-full border-collapse border border-gray-600 shadow-md text-sm text-left text-gray-400">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">S.No</th>
                    <th className="px-6 py-3">Thumbnail</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                {getAllBlog.length > 0 ? (
                  <tbody>
                    {getAllBlog.map((item, index) => (
                      <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition">
                        <td className="px-6 py-4">{index + 1}.</td>
                        <td className="px-6 py-4">
                          <img className="w-16 rounded-lg" src={item.thumbnail} alt="thumbnail" />
                        </td>
                        <td className="px-6 py-4">{item.blogs.title}</td>
                        <td className="px-6 py-4">{item.blogs.category}</td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteBlogs(item.id)}
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4">Not Found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="relative overflow-x-auto shadow-lg sm:rounded-xl">
              <table className="w-full border-collapse border border-gray-600 shadow-md text-sm text-left text-gray-400">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Message</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="bg-gray-800 hover:bg-gray-700 transition">
                      <td className="px-6 py-4">{msg.name}</td>
                      <td className="px-6 py-4">{msg.email}</td>
                      <td className="px-6 py-4">{msg.message}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;