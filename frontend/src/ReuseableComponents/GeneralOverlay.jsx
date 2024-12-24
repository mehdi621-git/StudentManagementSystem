import React, { useContext, useState } from 'react'
import Inputfield from './input'
import { Context } from '../context'

const GeneralOverlay = ({headline,placeholder}) => {
    const {genralOverlay,setGeneralOverlay} =useContext(Context)
  return (
    <>
{genralOverlay && <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-violet-100 to-indigo-100 bg-opacity-20 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={()=>setGeneralOverlay(false)}
              className="text-red-500 float-right text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">{headline}</h2>
            <div>
                <Inputfield placeholder={placeholder}></Inputfield>
                <p>ju</p>

                <div className='flex'>
                <Inputfield placeholder={"Add Semester"}></Inputfield>
                <Inputfield placeholder={"Add Subject"}></Inputfield>

                </div>
      

            </div>
            <div>
            </div>
            {/* <button className='float-right bg-red-600 p-2 font-semibold rounded-lg'>Edit</button> */}
            </div>
            </div>}
            </>
  )
}

export default GeneralOverlay