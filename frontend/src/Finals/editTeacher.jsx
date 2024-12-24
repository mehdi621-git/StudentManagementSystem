import React, { useContext, useEffect, useState } from "react";
import Inputfield from "../ReuseableComponents/input";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { GetStudentData, UpdateStudentData, UpdateTeacherData } from "../script/getTeacherData";

const EditTeacher = ({std}) => {
  const { teacher ,setteachers,student} = useContext(Context);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredData, setFilteredData] = useState([{}]);
  const [selectedTeacher,setSelectedTeacher] =useState({});
const [teachers,setTeachers] =useState(teacher)
  // const simpleArray = teacher.reduce((acc, curr) => {
  //     return [...acc, ...Object.values(curr)];
  //   }, []);
useEffect(()=>{
  if(std == "student"){
 setTeachers(student)
  }
},[std])
  //   console.log(simpleArray);
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    console.log("Search query:", query); // Check the current query
    console.log("Teachers data:", teachers);
    // Filter the data based on the search query
    if (query) {
      // Should log a string

      console.log("q", query, "t", teachers);
      const results = teachers.filter((item) =>
        item.FullName.toLowerCase().includes(query.toLowerCase())
      );
      console.log(results);
      setFilteredData(results);
      // Update filtered data
    } else {
      setFilteredData([]); // Clear results when search query is empty
    }
  };
  const handleTeacherData=(singleteacherData)=>{
    setSelectedTeacher(singleteacherData)
    
    setFilteredData(0)

    console.log(selectedTeacher)
    console.log(filteredData)
  }
  const handleNewData = (e, key) => {
    const { value } = e.target;
    setSelectedTeacher((prev) => ({
      ...prev,
      [key]: value, // Update the specific field in sel ectedTeacher
    }));
  };
  const handleChangeData=async ()=>{
    let res ;
    console.log("NewData",selectedTeacher)
    if(std == "student"){
      try {
       res = await UpdateStudentData(selectedTeacher) 
        console.log(res)
      } catch (error) {
        
      }
     

    }else{
       UpdateTeacherData(selectedTeacher) 

    }
  
  }
  

  return (
    <>
      <main class="flex  flex-col justify-center bg-cyan-500 p-3 rounded-md">
        <Link to={std == "student" ? "/student/home" :"/teacherPanel/home"}>
          <FaArrowAltCircleLeft size={25} color="yellow" />
        </Link>
        <div className="flex justify-end items-end  ">
          <Inputfield
             placeholder={`Search ${std == "student"? "Student" : "Teacher"} by Name`}
             labelname={(std == 'student' ? "Student" : "Teacher") + "Name"}
            Value={searchQuery}
            onchange={handleSearchChange}
            inputType={"text"}
            borderC={
              "w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            }
          ></Inputfield>

          <button onClick={handleChangeData} className="mx-2 mb-2 h-fit p-2 bg-green-600 font-bold rounded-lg">
            Change
          </button>
        </div>
        {searchQuery  && filteredData.length > 0 && (
        <div className="sticky w-full max-w-lg bg-white border border-slate-200 rounded-lg  shadow-lg">
          <ul className=" max-h-60 overflow-auto">
            {filteredData.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() =>handleTeacherData(item)}
              >
                {item.FullName}
              </li>
            ))}
          </ul>
        </div>
      )}
        <div class="w-full rounded-xl bg-white p-4 shadow-2xl shadow-white/40">
          <div class="mb-4 grid  gap-4">
            <div class="grid grid-cols-3 gap-2 ">{Object.entries(selectedTeacher).map(([key,value],i)=>{
                if (key !== "id" && key !== "ImagePath") {
          return    (    <Inputfield
            onchange={(e) => handleNewData(e, key)} 
          labelfor={key}
                   labelname={key}
                   inputType={key ==  "JoiningDate" || key == "AdmissionDate" ||key =="DateOfBirth" ? "date" : "text"}
                   Value={value}
                   borderC={
                     "w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
                   }
                 ></Inputfield>)
}})}
             
            </div>
          </div>

         </div>
      </main>
    </>
  );
};

export default EditTeacher;
