'use client'

import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Main() {

  const [open, setOpen] = useState(false)
  const router = useRouter()


  function handleOpen() {
    setOpen(prev => !prev)
  }

  function handleLogin() {
    localStorage.setItem('login', 'false')
    localStorage.removeItem('token')
    router.push('./')
  }
  return (
    <>
      <div className='w-full h-[70px] shadow-lg flex justify-between items-center pl-4 pr-4' >
        <div>
          <span className='text-xl sm:text-2xl md:text-3xl font-bold'>Medicare</span>
        </div>
        <div>
          <span className='text-[30px]' onClick={handleOpen}>{open == true ? <RxCross1 /> : <MdOutlineMenu />}</span>
        </div>
      </div>
      {/* Response menu  */}
      <div className={`w-[70%] bg-white h-[100vh] z-40 fixed top-0 ${open == false ? 'left-[-70%]' : 'left-0  shadow-2xl'} transition-all duration-200 ease-in-out`}>
        <div className='w-full h-[100vh] flex items-center flex-col'>
          <div className='w-full pt-5 pb-5 font-semibold flex justify-center items-center'>
            <span className='text-xl sm:text-2xl md:text-3xl font-bold'>Medicare</span>
          </div>
          <Link href={'/main'} onClick={handleOpen} className='w-full pt-2 pb-2 border-b border-t font-semibold flex justify-center items-center' >
            <span className="text-lg font-serif text-blue-600 hover:text-blue-800 cursor-pointer">Home</span>
          </Link>
          <Link href='/main/appointment' onClick={handleOpen} className='w-full pt-2 pb-2 border-b  font-semibold flex justify-center items-center'>
            <span className="text-lg font-serif text-blue-600 hover:text-blue-800 cursor-pointer">My Appointment</span>
          </Link>
          <div onClick={handleLogin} className='w-full pt-2 pb-2 border-b  font-semibold flex justify-center items-center'>
            <span className="text-lg font-serif text-blue-600 hover:text-blue-800 cursor-pointer">Logout</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
