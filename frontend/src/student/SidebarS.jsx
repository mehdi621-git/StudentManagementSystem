import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarS = () => {
  const navigate = useNavigate();



    const handleLogout = () => {
      // Remove role from local storage
      localStorage.removeItem("role");
    
      // Redirect to login page
      navigate("/login");
    };


  return (
    <div className="h-screen bg-blue-600 text-white w-64 fixed lg:relative shadow-lg transform transition-transform duration-300 ease-out hover:rotate-y-3d hover:scale-105 hover:shadow-2xl perspective-500">
      {/* Header Section */}
      <div className="p-6 text-center border-b border-blue-700">
        <h2 className="text-2xl font-semibold">Student Panel</h2>
        <p className="text-sm opacity-80">Welcome, Student!</p>
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-2">
        {/* Dashboard */}
        <Link to="/s">
          <li className="px-4 py-3 hover:bg-blue-500 transition duration-200 cursor-pointer flex items-center rounded-lg transform hover:translate-x-2">
            <i className="fas fa-home mr-3"></i>
            <span>Dashboard</span>
          </li>
        </Link>

        {/* Assignments */}
        <Link to="/s/assignment">
          <li className="px-4 py-3 hover:bg-blue-500 transition duration-200 cursor-pointer flex items-center rounded-lg transform hover:translate-x-2">
            <i className="fas fa-tasks mr-3"></i>
            <span>Assignments</span>
          </li>
        </Link>

        {/* Attendance */}
        <Link to="/s/attendence">
          <li className="px-4 py-3 hover:bg-blue-500 transition duration-200 cursor-pointer flex items-center rounded-lg transform hover:translate-x-2">
            <i className="fas fa-calendar-check mr-3"></i>
            <span>Attendance</span>
          </li>
        </Link>

        {/* Profile */}
        <Link to="/s/profile">
          <li className="px-4 py-3 hover:bg-blue-500 transition duration-200 cursor-pointer flex items-center rounded-lg transform hover:translate-x-2">
            <i className="fas fa-user mr-3"></i>
            <span>Profile</span>
          </li>
        </Link>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="px-4 py-3 hover:bg-red-500 transition duration-200 cursor-pointer flex items-center rounded-lg transform hover:translate-x-2"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarS;



