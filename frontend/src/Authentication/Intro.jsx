import React from "react";
import { useNavigate } from "react-router-dom";
import student1 from '../assets/imagee.png';
import student2 from '../assets/imagwe.png'
import student3 from '../assets/image.png'

const IntroPage = () => {
    const navigate = useNavigate(); // For redirecting after successful login

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-wide">
          Welcome to <span className="text-yellow-400">M & M</span>
        </h1>
        <p className="text-lg font-light">
          Simplifying Student Management with Efficiency, Precision, and Style!
        </p>
      </header>

      {/* Feature Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-5xl">
        {/* Card 1 */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <img
            src={student1}
            alt="Dashboard Illustration"
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Interactive Dashboard</h3>
          <p className="text-sm">
            Get a bird's-eye view of student data, attendance, assignments, and more—all in one place!
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <img
            src={student2}
            alt="Attendance Illustration"
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Smart Attendance Tracking</h3>
          <p className="text-sm">
            Track attendance effortlessly and ensure every student stays on the right path.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <img
            src={student3}
            alt="Profile Management Illustration"
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Personalized Profiles</h3>
          <p className="text-sm">
            View and manage student profiles with detailed information and easy updates.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center space-y-4">
        <p className="text-lg">
          Ready to take your institution to the next level?
        </p>
        <button onClick = {()=>navigate('/login')} className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition">
          Get Started Now
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-300">
        © 2024 M&M. All rights reserved.
      </footer>
    </div>
  );
};

export default IntroPage;
