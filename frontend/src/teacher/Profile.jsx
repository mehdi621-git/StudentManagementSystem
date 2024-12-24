import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../context';

const Profile = () => {
  const {id}=useContext(Context)// Fetch the teacher ID from the URL
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/backend/getteacherData.php?teacher_id=${id}`
        );
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setTeacher(response.data[0]);
        }
      } catch (err) {
        setError('Failed to fetch teacher data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [id]); // Run the effect when id changes

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Profile Picture */}
        <div className="lg:w-1/3 flex justify-center lg:justify-start mb-6 lg:mb-0">
          <img
            className="w-40 h-40 rounded-full object-cover shadow-lg"
            src={teacher.ImagePath || 'https://via.placeholder.com/150'}
            alt={teacher.FullName}
          />
        </div>

        {/* Teacher Details */}
        <div className="lg:w-2/3 lg:pl-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{teacher.FullName}</h2>
          <p className="text-sm text-gray-600 italic mb-4">{teacher.Designation}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Gender:</strong> {teacher.Gender}</p>
            <p><strong>Experience:</strong> {teacher.Experience}</p>
            <p><strong>Qualification:</strong> {teacher.Qualification}</p>
            <p><strong>Department:</strong> {teacher.Department}</p>
            <p><strong>Session:</strong> {teacher.Session}</p>
            <p><strong>Date of Birth:</strong> {teacher.DateOfBirth}</p>
            <p><strong>Joining Date:</strong> {teacher.JoiningDate}</p>
            <p><strong>Email:</strong> {teacher.Email}</p>
            <p><strong>Phone:</strong> {teacher.PhoneNo}</p>
            <p><strong>Address:</strong> {teacher.Address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
