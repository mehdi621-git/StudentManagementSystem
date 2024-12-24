import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(null); // Initialize as null

  useEffect(() => {
    // Fetch attendance data from the PHP backend
    axios
      .get('http://localhost/backend/fetch_attendence_g.php') // Adjust the path to your API
      .then((response) => {
        const sessions = response.data.sessions;

        // Map response data to chart configuration
        const labels = sessions.map((session) => session.session); // x-axis labels
        const data = sessions.map((session) => session.avg_marks); // y-axis data

        // Set chart data
        setAttendanceData({
          labels,
          datasets: [
            {
              label: 'Average Marks',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sessions',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Marks (%)',
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
    },
  };

  // Styling for the container
  const chartStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '300px',
    margin: '0 auto',
    minWidth: '60%',
  };

  return (
    <div style={chartStyle}>
      {attendanceData ? ( // Check if data is available
        <Line data={attendanceData} options={options} />
      ) : (
        <p>Loading attendance data...</p>
      )}
    </div>
  );
};

export default MonthlyAttendance;



