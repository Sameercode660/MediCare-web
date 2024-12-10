'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function Signup() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // sign up function 
  async function handleSignup() {
    setLoading(true)
    try {
      const data = {
        fullName,
        email,
        mobileNumber,
        password
      }


      if (!fullName || !email || !mobileNumber || !password) {
        alert('Any one field is empty')
        return;
      }


      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup-user`, data)
      setLoading(false)
      console.log(response);

      if (response.data.status == true) {
        localStorage.setItem('id', response.data.response.id)
        localStorage.setItem("token", response.data.response.accessToken)
        localStorage.setItem("login", "true")
        router.push('./main')
      } else {
        localStorage.setItem("login", "false")
        alert("Unable to sign in, Try again later")
      }


    } catch (error) {
      alert(error)
    }
  }


  return (
    <div className='w-[400px] h-[400px] flex justify-center items-center flex-col gap-2' >
      <div>
        <span className='text-4xl font-bold text-gray-800 text-center mb-6'>Sign Up</span>
      </div>
      <div>
        <input value={fullName} onChange={(e) => {
          setFullName(e.target.value)
        }} type="text" name="fullName" id="fullName" className='outline-none border rounded-md p-2 m-2' placeholder='FullName' />
      </div>
      <div>
        <input value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} type="email" name="email" id="email" className='outline-none border rounded-md p-2 m-2' placeholder='Email' />
      </div>
      <div>
        <input value={mobileNumber} onChange={(e) => {
          setMobileNumber(e.target.value)
        }} type="number" name="number" id="mobileNumber" className='outline-none border rounded-md p-2 m-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='Mobile Number' />
      </div>
      <div>
        <input value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" className='outline-none border rounded-md p-2 m-2' placeholder='Password' />
      </div>
      <div>
        <button onClick={handleSignup} className='w-[200px] h-[40px] border bg-blue-300 outline-none rounded-md text-white font-semibold text-[18px]'>{`${loading ? 'Sigining...' : 'Signup'}`}</button>
      </div>
      <div>
        <Link href="./login" className='text-[14px]'>Already User <span className='underline'>Login?</span></Link>
      </div>
    </div>
  )
}

export default Signup
