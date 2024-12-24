import React from 'react'
import { IoMdArrowDropleft } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
const Tags = ({styles,arrow,label,add}) => {
  return (
<div className={`bg-green-400 z-0 flex ${add ? 'justify-center gap-2 p-2' : "justify-between pl-10"} h-10 items-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${styles}`}>
  <span className='text-center font-semibold text-gray-800'>
    <p>{label}</p>
  </span>
  {arrow ? (
    <span className='mr-0 relative left-[10px]'>
      <IoMdArrowDropleft size={20} color='slate' className='transition-transform duration-300 hover:translate-x-1' />
    </span>
  ) : (
    <BsPlusCircleFill size={20} className="transition-all duration-300 hover:scale-110" />
  )}
</div>

  )
}

export default Tags