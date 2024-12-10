'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


function Protected({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    useEffect(() => {
        console.log(localStorage.getItem('login'))
        if (localStorage.getItem('login') == "false" || localStorage.getItem('login') == null || localStorage.getItem('login') == undefined) {
            router.push('./')
             
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default Protected
