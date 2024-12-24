import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Fee = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch attendance data
    axios
      .get('http://localhost/backend/fetch_fee_g.php') // Adjust the path to match your API
      .then((response) => {
        console.log(response.data);
        const sessions = response.data.sessions;

        // Prepare data for each session (Paid and Remaining attendance)
        const sessionNames = sessions.map((session) => session.session);
        const paid = sessions.map((session) => Number(session.paid));
        const remaining= sessions.map((session) => Number(session.remaining));

        // Set chart data
        setChartData({
          labels: sessionNames, // Session names as labels
          datasets: [
            {
              label: 'Paid ',
              data: paid,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light color for Paid
              borderColor: 'rgba(75, 192, 192, 1)', // Dark color for Paid
              borderWidth: 1,
            },
            {
              label: 'Remaining',
              data: remaining,
              backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light color for Remaining
              borderColor: 'rgba(255, 99, 132, 1)', // Dark color for Remaining
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        setError('Failed to fetch attendance data.');
        console.error(err);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h1>Fee Overview</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {chartData ? (
        <div style={{ width: '90%', height: '400px', margin: '0 auto' }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              indexAxis: 'y', // Horizontal bar chart
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  stacked: true, // Stack bars horizontally
                  beginAtZero: true, // Start X-axis at zero
                },
                y: {
                  stacked: true, // Stack bars on Y-axis
                },
              },
            }}
          />
          <p>
            <strong>Paid:</strong> {chartData.datasets[0].data.reduce((acc, val) => acc + val, 0)}<br />
            <strong>Remaining:</strong> {chartData.datasets[1].data.reduce((acc, val) => acc + val, 0)}
          </p>
        </div>
      ) : (
        <p>Loading attendance data...</p>
      )}
    </div>
  );
};

export default Fee;







