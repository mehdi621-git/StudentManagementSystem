import React, { useContext, useEffect, useState } from 'react'
import Inputfield from './input'
import { Context } from '../context'
import { GetStudentData, GetTeacherData } from '../script/getTeacherData'

const Table = ({std}) => {
    const {teacher,student}=useContext(Context)
    const [teachers,setteachers] =useState(teacher)
    const baseUrl = "http://localhost/backend/";
    console.log(teacher)
    useEffect(()=>{
        if(std == 'student'){
setteachers(student)
        }
  console.log("student is is",student)
  
    },[])
    useEffect(()=>{
      const fetchTeachers = async () => {
        try {
          const res = std == "student" ? await GetStudentData() : await GetTeacherData(); // Wait for the promise to resolve
          console.log("Resolved data (res):", res); // Ensure this logs the correct data
          setteachers(res);
          console.log(teacher) // Update the state with fetched dataGet
        } catch (error){
          console.error("Error in useEffect fetching teachers:", error);
        }
      };
    
      fetchTeachers(); 
    },[teachers])
  return (
    <div class="w-full mx-auto">
        
       
    
        <div class="w-full flex justify-between items-center mb-3 mt-1 pl-3">
            <div>
                <h3 class="text-lg font-semibold text-slate-800">All the {std ? "Student" :"Teacher"}</h3>
                <p class="text-slate-500">Overview of the current activities.</p>
            </div>
            {/* <div class="ml-3">
                <div class="w-full max-w-sm min-w-[200px] relative">
                <div class="relative">
                    {/* <Inputfield placeholder={"Search Student via Name"} borderC={"bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"}/> 
                    <button
                    class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                    type="button"
                    >
                   
                    </button>
                </div>
                </div>
            </div> */}
        </div>
        
        <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
        <thead>
    <tr>
        {teachers.length > 0 && Object.keys(teachers[0]).map((key, index) => (
            <th key={index} className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">{key}</p>
            </th>
        ))}
    </tr>
</thead>

            <tbody>
            {teachers.length > 0 ? teachers.map((row, i) => (
    <tr
    
      key={i} // Unique key for each row
      className="hover:bg-slate-50 border-b border-slate-200"
    >
      {Object.entries(row).map(([key, value], index) => (
        <td key={index} className="p-4 py-5">
            {key === "ImagePath" ? <img src = {baseUrl+ value} className='rounded-full w-8 h-8'/>:
          <p className="block font-semibold text-sm text-slate-800">{value}</p>}
        </td>
      ))}
    </tr>
  )) : <h2 className='items-center'>No data Avaliable</h2>}  
            
           
      
            </tbody>
        </table>

        </div>
        
            
     
    
    
    
    </div>
  )
}

export default Table