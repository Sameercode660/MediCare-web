'use client'
import React from 'react'

function AppointmentButton() {
  return (
    <div className="flex items-center justify-center h-[100px]">
      <button className="w-[90%] max-w-md py-4 text-white text-xl font-bold tracking-wide rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none">
        Book Appointment
      </button>
    </div>
  )
}

export default AppointmentButton
