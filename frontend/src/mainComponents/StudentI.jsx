import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Import the chart component
import { GetStudentData } from '../script/getTeacherData'; // Replace with your actual API import

const DistributionCharts = () => {
  const [genderData, setGenderData] = useState({});
  const [quotaData, setQuotaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetStudentData(); // API call to fetch the student data
        console.log('Response from API:', response); // Check what the response looks like

        // Check if response is an array and contains data
        if (!Array.isArray(response) || response.length === 0) {
          console.error('Received data is not an array or it is empty:', response);
          return;
        }

        // Calculate the gender distribution (assuming each student has a 'Student_type' property)
        const maleCount = response.filter(student => student.Gender === 'Male').length;
        const femaleCount = response.filter(student => student.Gender === 'Female').length;

        // Calculate the quota distribution (assuming each student has a 'Study_type' property)
        const hostelersCount = response.filter(student => student.Study_type === 'Hostel').length;
        const dayScholarsCount = response.filter(student => student.Study_type === 'Day_Scholar').length;

        // Update state for gender distribution chart
        setGenderData({
          labels: ['Male', 'Female'],
          datasets: [
            {
              data: [maleCount, femaleCount],
              backgroundColor: ['#36A2EB', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        });

        // Update state for quota distribution chart
        setQuotaData({
          labels: ['Hostelers', 'Day Scholars'],
          datasets: [
            {
              data: [hostelersCount, dayScholarsCount],
              backgroundColor: ['#FF9F40', '#4BC0C0'],
              hoverBackgroundColor: ['#FF9F40', '#4BC0C0'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  // Add check to ensure data is valid before passing to chart component
  if (!genderData.datasets || !quotaData.datasets) {
    return <div>Loading...</div>; // Or any loading placeholder
  }

  return (
    <div className="flex justify-around w-full min-w-[60%]">
      <div className="w-[300px] text-center">
        <h3 className="mb-2">Gender Distribution</h3>
        <Doughnut data={genderData} options={{ responsive: true }} />
      </div>

      <div className="w-[300px] text-center">
        <h3 className="mb-2">Hostelers vs Day Scholars</h3>
        <Doughnut data={quotaData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default DistributionCharts;

