import React from 'react'
import student from '../assets/Untitled design.png';
import { Link } from 'react-router-dom';


const Linker = ({headLine,body,src,link}) => {
  return (
    <>
<div className="bg-slate-900 w-full rounded-xl hover:cursor-pointer flex relative shadow-xl transform transition-all hover:scale-105">
  <img
    src={src}
    alt=""
    className="w-full h-full object-cover rounded-xl"
  />
  <div className="absolute flex flex-col justify-between w-full h-full p-4">
    {/* Top Div */}
    <div className=" px-1 md:px-4 pt-4 text-5xl font-extrabold rounded-t-xl text-gray-400 transform transition-all hover:scale-105">
      {headLine}
    </div>
    {/* Bottom Div */}
    <Link to={link}>  <div className="bg-orange-400 rounded-b-lg text-center p-1  transition-all duration-300 hover:bg-orange-600 transform hover:scale-105">
   More info
    </div></Link>
  </div>
</div>

    </>
  )
}

export default Linker