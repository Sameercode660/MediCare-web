'use client'

import React, { useEffect, useState } from 'react'
import AppointmentCard from './AppointmentCard'
import axios from 'axios'
import Loading from './Loading'
interface Appointment {
    id: string;
    userId: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    address: string;
    appointmentDate: string; // ISO date format
    status: string;
    createdAt: string; // ISO date format
  }
  

function Home() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function handleFetchTotalAppointment() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin-total-appointment`)

            setData(response.data.response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchTotalAppointment()
    }, [])

    return (
        <div className="p-4">
            {
                loading == true ? (<Loading></Loading>) : (
                    data.length == 0 ? (<div>
                        <span>Any any appointment is available</span>
                    </div>) : (
                        data.reverse().map((element: Appointment) => (
                            <AppointmentCard
                                id={element.id}
                                key={element.id}
                                customerName={element.fullName}
                                email={element.email}
                                phoneNumber={element.mobileNumber}
                                address={element.address}
                                date={new Date(element.appointmentDate).toLocaleDateString("en-GB")}
                                time={new Date(element.appointmentDate).toLocaleTimeString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  fetchData={handleFetchTotalAppointment}
                            />
                        ))
                    )
                )
            }
        </div>
    )
}

export default Home
