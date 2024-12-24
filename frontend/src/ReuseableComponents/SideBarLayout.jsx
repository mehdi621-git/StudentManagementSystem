import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropleft } from "react-icons/io";
import hod from "../assets/WhatsApp Image 2024-12-10 at 10.03.01_442e7c3f.jpg"
const SideBarLayout = () => {
  const handleLogout = () => {
    // Clear the localStorage item called 'roll'
    localStorage.removeItem("role");

    // Optionally, redirect to the login page or perform other actions after logout
    console.log("Logged out and 'roll' removed from localStorage");

    // Redirect to login page or handle other necessary actions here
    window.location.href = "/login"; // Example: redirect to login page
  };

  return (
    <div className="bg-gray-900 text-white w-full h-full flex flex-col items-center py-8 px-4 shadow-lg">
      {/* Admin Image Section */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={hod}
          alt="Admin"
          className="rounded-full w-2/3 border-4 border-gray-700 shadow-lg"
        />
        <p className="font-bold text-lg">Admin</p>
      </div>

      {/* Overview Section */}
      <div className="mt-12 w-full">
        <h2 className="text-center font-extrabold text-2xl mb-6 text-gray-200">Overview</h2>
        <nav className="flex flex-col gap-4">
          {/* Fee Collection Status Link */}
          <Link
            to="/admin/fee"
            className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 p-4 rounded-lg shadow-lg transition duration-300"
          >
            <span>Fee Collection Status</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>
          {/* Session Score Insights Link */}
          <Link
            to="/admin/attendence"
            className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 p-4 rounded-lg shadow-lg transition duration-300"
          >
            <span>Session Score Insights</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>
          {/* Student Demographics Link */}
          <Link
            to="/admin/student"
            className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 p-4 rounded-lg shadow-lg transition duration-300"
          >
            <span>Student Demographics</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </Link>
          {/* Feedback/Complaints Link */}
          {/* <div className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 p-4 rounded-lg shadow-lg transition duration-300">
            <span>Feedback/Complaints</span>
            <IoMdArrowDropleft size={30} color="slate" />
          </div> */}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg shadow-lg transition duration-300"
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideBarLayout;
