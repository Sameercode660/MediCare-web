'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {

    setLoading(true)
    try {
      const data = {
        email,
        password
      }

      if(!email || !password) {
        alert('Anyone field is empty')
        return;
      }

      const resposne = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login-user`, data)
      setLoading(false)

      console.log(resposne.data)

      if(resposne.data.status == true) {
        localStorage.setItem("token", resposne.data.response.accessToken)
        localStorage.setItem("login", "true")
        router.push('./main')
      } else {
        localStorage.setItem("login", "false")
        alert("Unable to login")
      }


    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='w-[400px] h-[400px] flex justify-center items-center flex-col gap-2' >
      <div>
        <span className='text-4xl font-bold text-gray-800 text-center mb-6'>Log In</span>
      </div>
      <div>
        <input value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} type="email" name="email" id="email" className='outline-none border rounded-md p-2 m-2' placeholder='Email'/>
      </div>
      <div>
        <input value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" className='outline-none border rounded-md p-2 m-2' placeholder='Password'/>
      </div>
      <div>
        <button onClick={handleLogin} className='w-[200px] h-[40px] border bg-blue-300 outline-none rounded-md text-white font-semibold text-[18px]'>{`${loading ? 'Sigining...': 'Sign in'}`}</button>
      </div>
      <div>
        <Link href="./" className='text-[14px]'>New User <span className='underline'>SignUp?</span></Link>
      </div>
    </div>
  )
}

export default Login
