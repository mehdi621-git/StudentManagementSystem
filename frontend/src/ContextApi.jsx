import { createContext, useState } from "react";

export const MainContext = createContext()

const AdminContext = ({children})=>{
   const [OverFlowObjects,setOverFlowObjects] = useState()


   return <>
        <MainContext.Provider value = {{OverFlowObjects,setOverFlowObjects}}>

          {children}

          </MainContext.Provider>
   </>
}
export default AdminContext
