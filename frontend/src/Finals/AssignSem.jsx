import React, { useState, useContext, useEffect } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Context } from '../context';
import Inputfield from '../ReuseableComponents/input';
import axios from 'axios';

const AssignSem = () => {
  // Access teacher data from context
  const { teacher } = useContext(Context);

  // Form state
  const [teacherId, setTeacherId] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [session, setSession] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // Teacher Name state
  const [message, setMessage] = useState('');
  const [teacherSuggestions, setTeacherSuggestions] = useState([]);

  // Fetch teacher suggestions as the user types
  const handleNameChange = async (e) => {
    const nameInput = e.target.value;
    setName(nameInput);

    // If name is entered, suggest teachers from the context or make an API call
    if (nameInput) {
      const filteredTeachers = teacher.filter((item) =>
        item.FullName.toLowerCase().includes(nameInput?.toLowerCase())
      );
      setTeacherSuggestions(filteredTeachers);
    } else {
      setTeacherSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle selecting a teacher from the suggestions
  const handleTeacherSelect = (selectedTeacher) => {
    setName(selectedTeacher.FullName); 
    console.log(selectedTeacher.id)// Set selected teacher's name
    setTeacherId(selectedTeacher.id);
    setEmail(selectedTeacher.Email) // Set selected teacher's ID
    setTeacherSuggestions([]); // Clear suggestions after selection
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message, name, email);

    if (!name || !teacherId || !semester || !subject || !session || !email) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost/backend/assign_semester.php', {
        teacher_name: name,
        teacher_id: teacherId,
        semester,
        subject,
        session
      });

      if (response.data.status === 'success') {
        setMessage('Assignment successful');
      } else {
        setMessage('Error: ' + response.data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center bg-cyan-500 p-3 rounded-md">
        <Link to={'/teacherPanel/home'}><FaArrowAltCircleLeft size={25} color="yellow" /></Link>
        <div className="flex justify-end">
          <button className="mr-10 mb-2 p-2 bg-green-600 font-bold rounded-lg" onClick={handleSubmit}>Assign</button>
        </div>
        <div className="w-full rounded-xl bg-white p-4 shadow-2xl shadow-white/40">
          <div className="mb-4 grid gap-4">
            <div className="flex">
              {/* Teacher Name Field with suggestions */}
              <Inputfield
                labelname="Teacher Name"
                inputType="text"
                onchange={handleNameChange} // Handle typing
                value={name} // Bind to name state
                borderC="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
              />
              {teacherSuggestions.length > 0 && (
                <ul className="absolute bg-white border top-4 text-black border-gray-300 w-full mt-1 rounded-md shadow-lg z-90">
                  {teacherSuggestions.map((teacher) => (
                    <li
                      key={teacher.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleTeacherSelect(teacher)} // Select teacher
                    >
                      {teacher.FullName + "---> id :" + teacher.id}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-4 flex">
            {/* Teacher Id Field */}
            <Inputfield
              labelname="Teacher Id"
              inputType="text"
            Value={teacherId} // Bind value to teacherId state
              onchange={(e) => setTeacherId(e.target.value)}
              borderC="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">Email address</label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-2 py-1 pl-8 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-row">
            <Inputfield
              labelname="Semester"
              inputType="number"
              onchange={(e) => setSemester(e.target.value)}
              borderC="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
            <Inputfield
              labelname="Subject"
              inputType="text"
              onchange={(e) => setSubject(e.target.value)}
              borderC="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
            <Inputfield
              labelname="Session"
              inputType="text"
              onchange={(e) => setSession(e.target.value)}
              borderC="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>

          {message && <div className="mt-4 text-center text-red-500">{message}</div>}
        </div>
      </main>
    </>
  );
};

export default AssignSem;

