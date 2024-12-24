import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Context } from "../context";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip);

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]); // marks data
  const [attendanceData, setAttendanceData] = useState([]); // attendance data

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} =useContext(Context)
 // Example Student ID

  // Mapping attendance data with marks
  const combineData = () => {
    const combinedData = [];
    // Iterate over assignments and map attendance data based on teacher name
    assignments.forEach((assignment) => {
      const teacherAttendance = attendanceData.find(
        (attendance) => attendance.teacher_name === assignment.teacher_name
      );
      if (teacherAttendance) {
        combinedData.push({
          teacher_name: assignment.teacher_name,
          marks: parseFloat(assignment.status), // Assuming marks are in the "status" field
          attendance_percentage: parseFloat(teacherAttendance.attendance_percentage),
        });
      }
    });
    return combinedData;
  };

  // Fetch assignments and attendance data
  useEffect(() => {
    const fetchAssignments = async () => {
        try {
          // Construct the URL with the query parameter
          const response = await fetch(`http://localhost/backend/fetch_assignments.php?studentId=${id}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch assignments');
          }
      
          const data = await response.json();
          console.log("ass", data);
          setAssignments(data); // Example data format from backend
        } catch (error) {
          console.error("Error fetching assignments:", error);
        }
      };
      
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`http://localhost/backend/student_attendance_fetch.php/?studentId=${id}`);
        const data = await response.json();
        setAttendanceData(data); // Example data format from backend
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attendance data.");
        setLoading(false);
      }
    };

    fetchAssignments();
    fetchAttendance();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Combine data for the graph
  const combinedData = combineData();

  // Graph data for attendance vs marks
  const graphData = {
    labels: combinedData.map((data) => data.teacher_name), // Using teacher names as x-axis
    datasets: [
      {
        label: "Attendance Percentage",
        data: combinedData.map((data) => data.attendance_percentage), // Attendance percentages on y-axis
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.3,
      },
      {
        label: "Marks",
        data: combinedData.map((data) => data.marks), // Marks data on y-axis
        fill: false,
        borderColor: "#FF5733",
        tension: 0.3,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Assignments */}
        <div className="bg-white p-4 rounded shadow-md lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Assignments</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Assignment</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.slice(0, 5).map((assignment) => (
                  <tr key={assignment.task_id}>
                    <td className="border px-4 py-2">{assignment.task_name}</td>
                    <td className="border px-4 py-2">{assignment.deadline}</td>
                    <td className="border px-4 py-2">
                      {assignment.status ? `${assignment.status} marks` : "Pending"}
                    </td>
                    <td className="border px-4 py-2">{assignment.teacher_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white p-4 rounded shadow-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Attendance Summary</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Teacher</th>
                <th className="border px-4 py-2">Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.slice(0, 5).map((attendance, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{attendance.teacher_name}</td>
                    <td className="border px-4 py-2 text-center">
                      {attendance.attendance_percentage}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="border px-4 py-2 text-center">
                    No attendance data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Progress Graph */}
      <div className="bg-white p-4 rounded shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance vs Marks</h2>
        <div className="h-64">
          <Line data={graphData} options={graphOptions} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


