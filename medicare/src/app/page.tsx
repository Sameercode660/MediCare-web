'use client'

import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()
  
  async function handleTokenLogin() {
    try {
      const data = {
        token: localStorage.getItem('token')
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token-login`, data)

      console.log(response)

      if(response.data.status == true) {
        localStorage.setItem('login', 'true')
        router.push('/main')
      } else {
        localStorage.setItem('login', 'false')
        router.push('/signup')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleTokenLogin()
  }, [])
  return (
    <>
      <Loading></Loading>
    </>
  );
}
