import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';

const AssignmentsTable = () => {
  const {id} =useContext(Context)
  const [assignments, setAssignments] = useState([]);
console.log(id)
  // Fetch assignments data from the backend
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

  useEffect(() => {
    fetchAssignments();
  }, [id]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="px-6 py-3">Task ID</th>
            <th className="px-6 py-3">Task Name</th>
            <th className="px-6 py-3">Deadline</th>
            <th className="px-6 py-3">Teacher</th>
            <th className="px-6 py-3">Marks</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{assignment.task_id}</td>
                <td className="px-6 py-4">{assignment.task_name}</td>
                <td className="px-6 py-4">{assignment.deadline}</td>
                <td className="px-6 py-4">{assignment.teacher_name}</td>
                <td className="px-6 py-4">
                  {assignment.status === "Pending" ? (
                    <span className="text-red-500">{assignment.status}</span>
                  ) : (
                    <span className="text-green-500">{assignment.status}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No assignments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsTable;
