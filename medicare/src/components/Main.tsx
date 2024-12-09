'use client'

import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";

function Main() {

  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(prev => !prev)
  }
  return (
    <>
    <div className='w-full h-[70px] shadow-lg flex justify-between items-center pl-4 pr-4' >
      <div>
        <span className='text-xl sm:text-2xl md:text-3xl font-bold'>Medicare</span>
      </div>
      <div>
        <span className='text-[30px]' onClick={handleOpen}><MdOutlineMenu /></span>
      </div>
    </div>
    {/* Response menu  */}
    <div className={`w-[70%] bg-[rgba(0,0,0,0.4)] h-[100vh] fixed top-0 ${open ? 'left-[-70%]' : 'left-0'} transition-all duration-200 ease-in-out`}></div>
    </>
  )
}

export default Main
