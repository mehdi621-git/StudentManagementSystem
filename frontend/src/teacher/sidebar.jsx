import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated to use useNavigate for redirection
import { FaHome, FaUserAlt, FaTasks, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Add the logout icon
import { IoMdArrowDropleft } from 'react-icons/io';
import { Context } from '../context';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { teacherPanel } = useContext(Context);
  const navigate = useNavigate(); // Use navigate for redirection after logout

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Function to handle logout
  const handleLogout = () => {
    // Clear session or authentication data here (e.g., localStorage.clear())
    localStorage.removeItem('roll'); // Example: remove token from localStorage
    // Redirect to login page
    navigate('/login'); // Replace '/login' with your actual login route
  };

  return (
    <div className="flex w-full sticky justify-start">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block min-h-screen bg-gray-900 text-white p-6 shadow-lg rounded-r-3xl transform transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col items-center mb-12">
          <img
            src={'http://localhost/backend/' + teacherPanel.ImagePath || 'https://via.placeholder.com/150'}
            alt="Admin"
            className="rounded-full w-24 h-24 border-4 border-gray-700 shadow-lg"
          />
          <p className="font-bold text-lg mt-4">Teacher Panel</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6">
          <Link
            to="/t/overview"
            className="flex items-center justify-between bg-gradient-to-r from-gray-500 to-gray-700 hover:from-blue-600 hover:to-blue-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <span>Home</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>

          <Link
            to="/t/attendence"
            className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <span>Attendance</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>

          <Link
            to="/t/assignments"
            className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <span>Assignments</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>

          <Link
            to="/t/tasks"
            className="flex items-center justify-between bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <span>Add Tasks</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>

          <Link
            to="/t/profile"
            className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <span>Profile</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>
        </nav>

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-between bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 p-4 mt-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 cursor-pointer"
        >
          <span>Logout</span>
          <FaSignOutAlt size={30} color="slate" />
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-5 bg-gray-800 text-white">
        <button onClick={toggleSidebar}>
          <FaCog size={24} />
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full p-6">{/* Your content goes here */}</div>
    </div>
  );
};

export default Sidebar;

