import React, { useContext, useEffect, useState } from 'react'
import Tags from '../ReuseableComponents/Tags'
import { Link, Outlet } from 'react-router-dom'
import Inputfield from '../ReuseableComponents/input'
import AddTeacherDetail from '../script/teacher'
import { Context } from '../context'
import ParentComponent from '../ReuseableComponents/overflow'
import GeneralOverlay from '../ReuseableComponents/GeneralOverlay'
import { GetTeacherData } from '../script/getTeacherData'


const TeacherPanel = ({label}) => {
    const [overlay,setOverlay]=useState("")
    const [placeholder,setPlaceholder] =useState("")
    const {teacher,setteachers, OverFlowTA, setOverFlowTA,setGeneralOverlay, setOverlayVisible,NoticeOverlay,setNoticeOverlay } =  useContext(Context);
  const  handleAddTeacher=(role)=>{
    AddTeacherDetail(role,setOverFlowTA,setOverlayVisible)
    }

    useEffect(()=>{
      const fetchTeachers = async () => {
        try {
          const res = await GetTeacherData(); // Wait for the promise to resolve
          console.log("Resolved data (res):", res); // Ensure this logs the correct data
          setteachers(res);
          console.log(teacher) // Update the state with fetched data
        } catch (error) {
          console.error("Error in useEffect fetching teachers:", error);
        }
      };
    
      fetchTeachers(); 
    },[])
  return (
    <>
<div className="min-h-screen flex flex-col items-center w-full overflow-x-hidden">
  {/* Action Buttons and Tags */}
  <div className="flex flex-wrap justify-center items-center gap-4 md:w-fit w-full md:mt-4 mt-2 p-4 bg-red-500 rounded-lg shadow-lg">
    <ParentComponent />

    {/* Add New Teacher Button */}
    <span onClick={() => handleAddTeacher("teacher")}>
      <Tags add={true} styles={"rounded-lg p-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all"} label={"Add new Teacher"} />
    </span>

    {/* General Overlay */}


    {/* Edit Teacher, Delete Teacher, Mark Attendance */}
    <div className="flex gap-4">
      <Link to={'/teacherPanel/edit'}  >
        <Tags add={true} styles={"rounded-lg p-3 bg-yellow-600 text-white cursor-pointer hover:bg-yellow-700 transition-all"} label={"Edit Teacher"} />
      </Link>
      <Link to = {'/teacherPanel/delete'} >
        <Tags add={true} styles={"rounded-lg p-3 bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-all"} label={"Delete Teacher"} />
      </Link>
      {/* <span onClick={() => handleEditTeacher("Mark Attendance")}>
        <Tags add={true} styles={"rounded-lg p-3 bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-all"} label={"Mark Attendance"} />
      </span> */}
    </div>

    {/* Assign Semester & Subject Link */}
    <Link to={"/teacherPanel/assign"}>
      <Tags add={true} styles={"rounded-lg p-3 bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-all"} label={"Assign Semester & Subject"} />
    </Link>
  </div>

  {/* Main Content Area */}
  <div className="md:w-[80%] w-full mx-auto mt-5 overflow-hidden">
    <Outlet />
  </div>
</div>


    </>
  )
}

export default TeacherPanel