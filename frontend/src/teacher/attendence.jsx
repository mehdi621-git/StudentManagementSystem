import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import axios from 'axios';

const Attendence = () => {
  const { sessionId, setsessionId, session, setTsession ,id} = useContext(Context);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // Track attendance status
  const [selectedDate, setSelectedDate] = useState(''); // Track selected date

  useEffect(() => {
    // When sessionId or session changes, fetch new student data and reset attendance
    const fetchData = () => {
      if (sessionId >= 0 && session[sessionId]) {
        const studentsData = session[sessionId].Students;
        setStudents(studentsData);

        // Initialize attendance with all students set to false
        const initialAttendance = {};
        studentsData.forEach((student) => {
          initialAttendance[student.StudentId] = false; // Initially set all attendance to false
        });
        setAttendance(initialAttendance);
      }
    };

    fetchData();
  }, [sessionId, session]); // This will run when sessionId or session changes

  const handleAttendanceChange = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId], // Toggle attendance
    }));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update selected date

    // Re-initialize attendance based on the students
    const initialAttendance = {};
    students.forEach((student) => {
      initialAttendance[student.StudentId] = false; // Reset attendance for all students to false
    });
    setAttendance(initialAttendance); // Reset attendance when date changes
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert('Please select a date before submitting.');
      return;
    }

    const attendanceData = Object.keys(attendance).map((studentId) => ({
      session: session[sessionId].Session,
      student_id: studentId,
      teacher_id: id,
      date: selectedDate,
      present: attendance[studentId],
    }));

    axios
      .post('http://localhost/backend/submit_attendance.php', attendanceData)
      .then((response) => {
        if (response.data.success) {
          alert('Attendance successfully submitted!');
        } else {
            console.log(response.message)
          alert(`Error: ${response.data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting attendance.');
      });

    console.log('Attendance Submitted for Date:', selectedDate, 'Attendance:', attendance);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Attendance Sheet</h2>

      {/* Date Picker */}
      <div className="mb-6">
        <label htmlFor="attendance-date" className="block text-sm font-semibold text-gray-700">
          Select Date:
        </label>
        <input
          type="date"
          id="attendance-date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Attendance Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students?.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3">{student.StudentId}</td>
                <td className="px-4 py-3">{student.StudentName}</td>
                <td className="px-4 py-3">{student.StudentGender}</td>
                <td className="px-4 py-3">{student.StudentType}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    name={index}
                    disabled={!selectedDate}
                    checked={attendance[student.StudentId] || false}
                    onChange={() => handleAttendanceChange(student.StudentId)}
                    className="scale-125 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">Loading students...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Submit Button */}
      <button
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={handleSubmit}
        disabled={!selectedDate} // Disable button if no date is selected
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendence;



