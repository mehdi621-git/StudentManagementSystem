import React, { useEffect, useState } from "react";
import axios from "axios";

const MarkFee = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [feeData, setFeeData] = useState({ student_id: "", fee_amount: "", fee_date: "" });

  // Fetch students from backend
  const fetchStudents = () => {
    axios
      .get("http://localhost/backend/fetchStudents.php", { params: { search } })
      .then((response) => 
        setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  // Add fee for a student
  const addFee = () => {
    axios
      .post("http://localhost/backend/addFee.php", feeData)
      .then((response) => {
     
        if (response.data.success) {
          setFeeData({ student_id: "", fee_amount: "", fee_date: "" });
          fetchStudents();
console.log("stu",students)

        } else {
          console.error("Error adding fee:", response.data.error);
        }
      })
      .catch((error) => console.error("Error adding fee:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fee Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search students by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 mb-4"
      />

      {/* Fee Form */}
      <div className="mb-4">
        <select
          value={feeData.student_id}
          onChange={(e) => setFeeData({ ...feeData, student_id: e.target.value })}
          className="border px-3 py-2 mb-2"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.FullName}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Fee Amount"
          value={feeData.fee_amount}
          onChange={(e) => setFeeData({ ...feeData, fee_amount: e.target.value })}
          className="border px-3 py-2 mb-2"
        />
        <input
          type="date"
          value={feeData.fee_date}
          onChange={(e) => setFeeData({ ...feeData, fee_date: e.target.value })}
          className="border px-3 py-2 mb-2"
        />
        <button onClick={addFee} className="bg-blue-500 text-white px-4 py-2">
          Add Fee
        </button>
      </div>

      {/* Student List */}
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border p-2 mb-2">
            <div className="font-bold">{student.FullName} - {student.Department} - {student.Session}</div>
            <ul>
              {student.fees.map((fee, index) => (
                <li key={index} className="text-sm">
                  {fee.date}: Pkr {fee.amount}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkFee;

