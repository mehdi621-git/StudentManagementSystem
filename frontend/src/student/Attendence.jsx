import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';

const Attendance = () => {
  const [attendance,setAttendanceData] = useState([]);
  const {id} =useContext(Context)
  const [error, setError] = useState(null);


  const fetchAttendance = async () => {
    try {
      const response = await fetch(`http://localhost/backend/student_attendance_fetch.php/?studentId=${id}`);
      const data = await response.json();
      console.log(data)
      setAttendanceData(data); // Example data format from backend
    } catch (err) {
      setError("Failed to fetch attendance data.");
    }
  };




  useEffect(() => {
    fetchAttendance();
  }, [id]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-teal-500 text-white text-left">
            <th className="px-6 py-3">Teacher Name</th>
            <th className="px-6 py-3">Attendance Percentage</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((item, index) => {
              const attendancePercentage = parseFloat(item.attendance_percentage);
              let statusColor = "bg-gray-100"; // Default status color for low attendance
              
              // Define color based on attendance percentage
              if (attendancePercentage >= 75) {
                statusColor = "bg-green-200";
              } else if (attendancePercentage >= 50) {
                statusColor = "bg-yellow-200";
              } else {
                statusColor = "bg-red-200";
              }

              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{item.teacher_name}</td>
                  <td className="px-6 py-4">{item.attendance_percentage}%</td>
                  <td className={`px-6 py-4 ${statusColor} font-semibold`}>
                    {attendancePercentage >= 75 ? "Good" : attendancePercentage >= 50 ? "Average" : "Poor"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No attendance data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
