
import React from 'react'
import SideBarLayout from '../ReuseableComponents/SideBarLayout'
import Admin from './admin'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen w-full relative bg-slate-300 flex ">
 <div className="bg-red-600 w-3/12 min-h-screen">
        <SideBarLayout></SideBarLayout>
      </div>
        <Outlet></Outlet>
  
      </div>

  )
}

export default Layout