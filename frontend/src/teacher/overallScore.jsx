import React, { useContext, useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Context } from '../context';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

const Dashboard = () => {
  const { session, sessionId ,id } = useContext(Context); // Access teacherId from context
  const [studentData, setStudentData] = useState([]);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [TaskMarksData, setTaskMarksData] = useState([]);


  useEffect(() => {
    const fetchData = () => {
      if (session[sessionId]?.Students) {
        const maleCount = session[sessionId].Students.filter(student => student.StudentGender === 'Male').length;
        const femaleCount = session[sessionId].Students.filter(student => student.StudentGender === 'Female').length;

        // Count Hostelers and Day Scholars
        const hostelersCount = session[sessionId].Students.filter(student => student.studyType === 'Hosteler').length;
        const dayScholarsCount = session[sessionId].Students.filter(student => student.studyType === 'Day Scholar');

        // Set Pie chart data
        setPieData({
          labels: ['Male', 'Female'],
          datasets: [
            {
              data: [maleCount, femaleCount],
              backgroundColor: ['#36A2EB', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        });

        // Set Bar chart data for Hostelers vs Day Scholars
        setBarData({
          labels: ['Hostelers', 'Day Scholars'],
          datasets: [
            {
              label: 'Number of Students',
              data: [hostelersCount, dayScholarsCount.length],
              backgroundColor: '#4BC0C0',
              borderColor: '#4BC0C0',
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log('No students data available');
      }
    };

    fetchData();
  }, [session, sessionId]);

  useEffect(() => {
    const fetchTaskMarks = async () => {
      try {
        const response = await fetch(`http://localhost/backend/getMarks_g.php?teacher_id=${id}`);
        const data = await response.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setTaskMarksData(data);
        }
      } catch (error) {
        console.error('Error fetching task marks:', error);
      }
    };

    fetchTaskMarks();
  }, [id]);

  const sessionStudentIds = session[sessionId]?.Students.map(student => student.StudentId);

  const filteredTaskMarksData = TaskMarksData.filter(entry =>
    sessionStudentIds?.includes(entry.student_id)
  );

  const aggregatedMarks = filteredTaskMarksData.reduce((acc, entry) => {
    const studentName = session[sessionId].Students.find(student => student.StudentId === entry.student_id)?.StudentName;

    if (acc[studentName]) {
      acc[studentName] += entry.marks;
    } else {
      acc[studentName] = entry.marks;
    }

    return acc;
  }, {});

  const chartData = Object.keys(aggregatedMarks).length > 0 ? {
    labels: Object.keys(aggregatedMarks),
    datasets: [
      {
        label: 'Task Marks',
        data: Object.values(aggregatedMarks),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  } : null;

  // Attendance stats (Example logic, replace with real data)
  const presentCount = session[sessionId]?.Students.filter(student => student.attendance === 'Present').length || 0;
  const absentCount = session[sessionId]?.Students.filter(student => student.attendance === 'Absent').length || 0;

  return (
    <div className="p-6 bg-blue-400 shadow-xl rounded-md h-full flex flex-col">
      {/* Container for the layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gender Pie Chart */}
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-center mb-4">Gender Distribution</h3>
          {pieData ? (
            <Pie data={pieData} options={{ responsive: true }} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Current Session Students Table */}
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-xl font-semibold text-center mb-4">Current Session Students</h3>
          <div className="flex-grow overflow-y-auto space-y-2">
            {session[sessionId] && session[sessionId].Students.length > 0 ? (
              session[sessionId].Students.map((student, index) => (
                <div
                  key={index}
                  className="py-2 px-4 bg-gray-100 rounded-md shadow-sm text-sm text-gray-700 flex justify-between items-center"
                >
                  <span>{student.StudentName}</span>
                  <span className="text-gray-500">{student.StudentType}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No students found</p>
            )}
          </div>
        </div>

        {/* New Third Column: Attendance Stats and Session Overview */}
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-xl font-semibold text-center mb-4">Session Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">Total Students:</span>
              <span>{session[sessionId]?.Students.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">Present:</span>
              <span>{presentCount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">Absent:</span>
              <span>{absentCount}</span>
            </div>
            {/* Optional: Task completion overview */}
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">Tasks Completed:</span>
              <span>{(filteredTaskMarksData.length / session[sessionId]?.Students.length * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marks Task Chart */}
      <div className="p-4 bg-white m-2  shadow-md rounded-lg flex flex-col items-center h-[350px]">
        <h3 className="text-xl font-semibold text-center mb-4">Session Progress Marks</h3>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              height: 300,
            }}
          />
        ) : (
          <p>Loading task marks data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;





