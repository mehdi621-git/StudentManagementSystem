import React, { useContext, useState } from "react";
import Linker from "../ReuseableComponents/Linker";
import SideBarLayout from "../ReuseableComponents/SideBarLayout";
import Tags from "../ReuseableComponents/Tags";
import Notification from "../ReuseableComponents/Notification";
import Charts from "../ReuseableComponents/Charts";
import AttendanceLineChart from "../ReuseableComponents/AttendenceChart";
import { Outlet } from "react-router-dom";
import DistributionCharts from "./Layout";
import ParentComponent from "../ReuseableComponents/overflow";
import { Context } from "../context";
import Inputfield from "../ReuseableComponents/input";
import AddNotice from "../Finals/addNotice";
import student from '../assets/Untitled design.png';
import student1 from '../assets/Untitled design (1).png';
import student2 from '../assets/Untitled design (2).png';
import AddTeacherDetail from "../script/teacher";



const Admin = () => {
  //const { OverFlowObjects, setOverFlowObjects } = useContext(MainContext);
  const { OverFlowTA, setOverFlowTA, OverlayVisible, setOverlayVisible,NoticeOverlay,setNoticeOverlay } =  useContext(Context);

  //console.log(OverFlowbjects)
  //const {OverflowObjects,setOverFlowObjects} = useContext(mainContext);
  const handleOverflowElements = (role) => {
   AddTeacherDetail(role,setOverFlowTA,setOverlayVisible)
  };
  const handleNotice = ()=>{
console.log("clicked")
  setNoticeOverlay(!NoticeOverlay)
  console.log(NoticeOverlay)

  }
  return (
    

      <div className="w-[90%] h-[100%]">
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-2/6 justify-items-center mt-4 px-5">
  <Linker headLine={"Teacher"} src={student1} link={'/teacherPanel'} />
  <Linker headLine={"Students"} src={student} link={'/student'}/>
  {/*<Linker headLine={"Result"} src={student2} />*/}
</div>

<AddNotice></AddNotice>
        <ParentComponent></ParentComponent>
        <div className="grid grid-cols-3  gap-3 w-full px-5 ">
        <span onClick={() => handleOverflowElements("teacher")} className="transform hover:scale-105 transition-all duration-300">
  <Tags
    styles={"rounded-full mt-4 px-6 py-2 bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-colors"}
    arrow={false}
    add={true}
    label={"Add New Teacher"}
  />
</span>

<span onClick={() => handleOverflowElements("student")} className="transform hover:scale-105 transition-all duration-300">
  <Tags
    styles={"rounded-full mt-4 px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors"}
    arrow={false}
    add={true}
    label={"Add New Student"}
  />
</span>

{/* <span onClick={handleNotice} className="transform hover:scale-105 transition-all duration-300">
  <Tags
    styles={"rounded-full mt-4 px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 cursor-pointer transition-colors"}
    arrow={false}
    add={true}
    label={"Add Notice"}
  />
</span> */}

        </div>
        <div className=" flex flex-1 md:flex-row-reverse flex-col-reverse justify-between px-10 pt-5">
          <div className="  bg-white h-fit rounded-md ">
            {/* <Notification></Notification> */}
          </div>
          <Outlet></Outlet>
        </div>
      </div>
   
  );
};

export default Admin;
