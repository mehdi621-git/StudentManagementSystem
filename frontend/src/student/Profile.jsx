import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const {id} =useContext(Context)
 // Student ID for fetching data
  
  // Fetching student data from the backend
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost/backend/fetch_student.php?studentId=${id}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setStudentData(data);
        }
      } catch (err) {
        setError('Failed to fetch student data');
      }
    };

    fetchStudentData();
  }, [id]);

  // If data is not available or there's an error
  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (!studentData) {
    return <div className="text-center text-gray-500">Loading profile...</div>;
  }

  // Extracting student data from the API response
  const {
    ImagePath,
    FullName,
    DateOfBirth,
    Gender,
    Session,
    PhoneNo,
    Email,
    Address,
    Student_id,
    Department,
    Admission_Date,
    Study_type,
    Student_type,
    Course,
    PrevSkl
  } = studentData;

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md border border-gray-300">
      {/* Profile Header: Image and Basic Info */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg">
          <img src={'http://localhost/backend/'+ImagePath} alt="Student Profile" className="w-full h-full object-cover" />
        </div>

        {/* Student Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800">{FullName}</h2>
          <p className="text-lg text-gray-600">Student ID: <span className="font-semibold text-indigo-600">{Student_id}</span></p>
          <p className="text-lg text-gray-600">Department: <span className="font-semibold text-indigo-500">{Department}</span></p>
          <p className="text-lg text-gray-600">Course: <span className="font-semibold text-blue-500">{Course}</span></p>
        </div>
      </div>

      {/* Personal and Contact Information */}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Date of Birth: <span className="font-semibold text-gray-700">{new Date(DateOfBirth).toLocaleDateString()}</span></p>
            <p className="text-gray-600">Gender: <span className={`font-semibold ${Gender === 'Male' ? 'text-blue-600' : 'text-pink-600'}`}>{Gender}</span></p>
            <p className="text-gray-600">Admission Date: <span className="font-semibold text-gray-700">{new Date(Admission_Date).toLocaleDateString()}</span></p>
          </div>

          <div>
            <p className="text-gray-600">Session: <span className="font-semibold text-gray-700">{Session}</span></p>
            <p className="text-gray-600">Study Type: <span className="font-semibold text-gray-700">{Study_type}</span></p>
            <p className="text-gray-600">Student Type: <span className="font-semibold text-gray-700">{Student_type}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Phone No: <span className="font-semibold text-gray-700">{PhoneNo}</span></p>
            <p className="text-gray-600">Email: <span className="font-semibold text-blue-600">{Email}</span></p>
          </div>

          <div>
            <p className="text-gray-600">Address: <span className="font-semibold text-gray-700">{Address}</span></p>
          </div>
        </div>

        <div>
          <p className="text-gray-600">Previous School: <span className="font-semibold text-gray-700">{PrevSkl}</span></p>
        </div>
      </div>

      {/* Session Details */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700">Session Information</h3>
        <ul className="mt-2 space-y-2">
          <li className="text-gray-600">Session ID: <span className="font-semibold text-gray-700">{Session}</span></li>
          <li className="text-gray-600">Study Type: <span className="font-semibold text-gray-700">{Study_type}</span></li>
          <li className="text-gray-600">Student Type: <span className="font-semibold text-gray-700">{Student_type}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default StudentProfile;


