import React, { useContext, useEffect, useState } from "react";
import Inputfield from "../ReuseableComponents/input";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { deleteStudent, deleteTeacher } from "../script/getTeacherData";
import { AiFillDelete } from "react-icons/ai";

const DeeleteTeacher = ({ std }) => {
  const { teacher, student } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data state

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    console.log("Search query:", query); // Check the current query
    console.log("Teachers data:", teacher);
    let results;
    if (std === "student") {
      results = student.filter((item) =>
        item.FullName.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      results = teacher.filter((item) =>
        item.FullName.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredData(results);
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    let res;
    if (std === "student") {
      res = await deleteStudent(id);
    } else {
      res = await deleteTeacher(id);
    }

    if (res.status === 200) {
      alert("Deleted Successfully");

      // Manually update the filteredData after successful deletion
      const updatedData = filteredData.filter((item) => item.id !== id);
      setFilteredData(updatedData);
    } else {
      alert("Error deleting record");
    }
  };

  return (
    <main className="flex flex-col justify-center bg-[#F6AD55] p-3 rounded-md">
      <Link to={std == "student" ? "/student" :"/teacherPanel"}>
        <FaArrowAltCircleLeft size={25} color="yellow" />
      </Link>
      <div className="flex justify-end items-end">
        <Inputfield
          placeholder={`Search ${std === "student" ? "Student" : "Teacher"} by Name`}
          labelname={std === "student" ? "Student Name" : "Teacher Name"}
          Value={searchQuery}
          onchange={handleSearchChange}
          inputType={"text"}
          borderC={
            "w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          }
        />
      </div>

      {searchQuery && filteredData.length > 0 && (
        <div className="sticky w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-auto">
            {filteredData?.map((item, index) => (
              <li key={index} className="px-4 py-2 w-full flex justify-between">
                <span>{item.FullName}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <AiFillDelete color="red" size={25} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default DeeleteTeacher;

