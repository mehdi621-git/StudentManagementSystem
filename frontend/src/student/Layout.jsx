
import React, { useContext, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { Context } from '../context'
import SidebarS from './SidebarS'

const LayoutS = () => {
  const teacherId = 1;
  const {session,setTsession} =useContext(Context)
//   useEffect(() => {
    // Fetch session data from the backend API
//     const fetchSessions = async () => {
//       try {
//         const response = await fetch(`http://localhost/backend/fetch_sessions.php?teacherId=${teacherId}`);
//         const data = await response.json();

//         if (data.error) {
//        console.log(data.rror)
//         } else {
//           setTsession(data)
//         }
//       } catch (err) {
//         console.log("Eror while fetching data")
//       }
//     };

//     fetchSessions();
//   }, [teacherId]);
  return( <>
    <div className="min-h-screen w-full relative bg-slate-300 flex flex-row ">
    <div className="bg-red-600 w-3/12 min-h-screen">
   <SidebarS></SidebarS>
         </div>
         <div className='flex w-full flex-col m-5'>
           <Outlet></Outlet>
     </div>
         </div>
         </>
  )
}

export default LayoutS