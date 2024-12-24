import React, { useContext, useEffect, useState } from 'react'
import Tags from '../ReuseableComponents/Tags'
import { Link, Outlet } from 'react-router-dom'
import Inputfield from '../ReuseableComponents/input'
import AddTeacherDetail from '../script/teacher'
import { Context } from '../context'
import ParentComponent from '../ReuseableComponents/overflow'
import GeneralOverlay from '../ReuseableComponents/GeneralOverlay'
import { GetStudentData, GetTeacherData } from '../script/getTeacherData'
const AdminStudent = ()=>{
    const [overlay,setOverlay]=useState("")
    const [placeholder,setPlaceholder] =useState("")
    const {student,setstudent, OverFlowTA, setOverFlowTA,setGeneralOverlay, setOverlayVisible,NoticeOverlay,setNoticeOverlay } =  useContext(Context);
  const  handleAddTeacher=(role)=>{
    AddTeacherDetail(role,setOverFlowTA,setOverlayVisible)
    }
   

    useEffect(()=>{
      const fetchSTudents = async () => {
        try {
          const res = await GetStudentData(); // Wait for the promise to resolve
          console.log("Resolved data (res):", res); // Ensure this logs the correct data
          setstudent(res);
          console.log(student) // Update the state with fetched data
        } catch (error) {
          console.error("Error in useEffect fetching teachers:", error);
        }
      };
    
      fetchSTudents(); 
    },[])
  return (
    <>
<div className="min-h-screen flex flex-col items-center w-full overflow-x-hidden">
  {/* Action Buttons and Tags */}
  <div className="flex flex-wrap justify-center items-center gap-4 md:w-fit w-full md:mt-4 mt-2 p-4 bg-red-500 rounded-lg shadow-lg">
    <ParentComponent />

    {/* Add New Teacher Button */}
    <span onClick={() => handleAddTeacher("student")}>
      <Tags add={true} styles={"rounded-lg p-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all"} label={"Add new Student"} />
    </span>

    {/* General Overlay */}
   

    {/* Edit Teacher, Delete Teacher, Mark Attendance */}
    <div className="flex gap-4">
      <Link to={'/student/edit'}>
        <Tags add={true} styles={"rounded-lg p-3 bg-yellow-600 text-white cursor-pointer hover:bg-yellow-700 transition-all"} label={"Edit Student"} />
      </Link>
      <Link to = {'/student/delete'} >
        <Tags add={true} styles={"rounded-lg p-3 bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-all"} label={"Delete Student"} />
      </Link>
     
    </div>

    {/* Assign Semester & Subject Link */}
    <Link to={"/student/markFee"}>
      <Tags add={true} styles={"rounded-lg p-3 bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-all"} label={"Fee Status"} />
    </Link>
  </div>
  <div className="md:w-[80%] w-full mx-auto mt-5 overflow-hidden">
    <Outlet />
  </div>
  </div>
  </>
  )
}
export default AdminStudent