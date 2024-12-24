import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import SessionPanel from './Block';
import { Context } from '../context';
import axios from 'axios';

const LayoutT = () => {

  const { session, setTsession, teacherPanel, setTeacherPanel ,id} = useContext(Context);

  useEffect(() => {
    // Fetch session data from the backend API
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost/backend/fetch_sessions.php?teacherId=${id}`);
        const data = await response.json();

        if (data.error) {
          console.log("Error fetching sessions:", data.error); // Log the error message correctly
        } else {
          setTsession(data); // Set the session data
        }
      } catch (err) {
        console.error("Error while fetching sessions data:", err); // Log the actual error
      }
    };

    // Fetch teacher data
    const fetchTeacherData = async () => {
      console.log("Fetching teacher data...");
      try {
        const response = await axios.get(`http://localhost/backend/getteacherData.php?teacher_id=${id}`);
        console.log(response);
        if (response.data.error) {
          console.error("Error fetching teacher data:", response.data.error); // Log the error message correctly
          alert(response.data.error);
        } else {
          console.log("Teacher data fetched successfully:", response.data);
          setTeacherPanel(response.data[0]); // Set the teacher panel data
        }
      } catch (err) {
        console.error("Error while fetching teacher data:", err); // Log the actual error
        alert('Failed to fetch teacher data');
      }
    };

    fetchSessions(); // Fetch sessions data
    fetchTeacherData(); // Fetch teacher data
  }, [id, setTsession, setTeacherPanel]);

  return (
    <>
     <div className="min-h-screen w-full relative bg-gray-50 flex flex-row"> {/* Lighter background for the page */}
  {/* Sidebar with a darker blue shade for contrast */}
  <div className="bg-blue-900 text-white max-w-3/12 rounded-lg min-h-screen hover:bg-blue-800 transition-all ease-in-out">
    <Sidebar />
  </div>
  
  {/* Main content area with a softer blue and accent borders */}
  <div className="flex w-full flex-col m-5 bg-gradient-to-t from-blue-700 via-white to-blue-600 rounded-lg shadow-xl">
    {/* Add subtle hover effects on session blocks */}
    <SessionPanel />
    <Outlet />
  </div>
</div>

    </>
  );
}

export default LayoutT;
