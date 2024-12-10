'use client'
import React, { useEffect, useState } from 'react'
import AppointmentCard from './AppointmentCard'
import axios from 'axios'
import Loading from './Loading'

export interface Appointment {
    id: string;  
    userId: string;  
    fullName: string; 
    email: string; 
    mobileNumber: string;  
    address: string;  
    appointmentDate: string;  
    status: string;  
    createdAt: string;  
  }
  

function MyAppointment() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function handleFetchMyAppointment() {
        try {
            const data = {
                userId: localStorage.getItem('id')
            }
            setLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-total-appointment`, data)
            setLoading(false)


            setData(response.data.response)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchMyAppointment()
    }, [])
    return (
        <>
            {
                loading == true ? (<Loading></Loading>) : (
                    data.length == 0 ? (<div>No any appointment</div>) : (data.reverse().map((element: Appointment) => (<AppointmentCard key={element.id} customerName={element.fullName} appointmentDate={element.appointmentDate} status={element.status}></AppointmentCard>)))
                )
            }

        </>
    )
}

export default MyAppointment
