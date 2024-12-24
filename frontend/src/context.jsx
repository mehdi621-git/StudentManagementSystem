import { Children, createContext, useState } from "react";


export const Context = createContext();

const AdminContext = ({children}) =>{
    
 const [OverFlowTA,setOverFlowTA] = useState({})  
 const [OverlayVisible,setOverlayVisible] = useState(false) //TA=Teacher in Admin
 const [NoticeOverlay,setNoticeOverlay] =useState(false)
 const [genralOverlay,setGeneralOverlay] =useState(false)
 const [teacher,setteachers] = useState([])
 const [student,setstudent] = useState([])
 const [session,setTsession] =useState([])
 const [sessionId,setsessionId] =useState(0)
 const [Steacher,setSingleTeacher] =useState({})
 const [state,setstate] =useState(null)
 const [teacherPanel,setTeacherPanel] =useState({})
 const [id,setid] =useState(0)





    return <>
       <Context.Provider value = {{id,setid,teacherPanel,setTeacherPanel,state,setstate,Steacher,setSingleTeacher,sessionId,setsessionId,session,setTsession,student,setstudent,teacher,setteachers,OverFlowTA,setOverFlowTA,OverlayVisible,setOverlayVisible,NoticeOverlay,setNoticeOverlay,genralOverlay,setGeneralOverlay}}> 
        {children}
       </Context.Provider>
    </>
}
export default AdminContext