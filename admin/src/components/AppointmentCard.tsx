'use client'

import axios from "axios";
import React, { useState } from "react";

interface AppointmentCardProps {
    id: string
    customerName: string;
    email: string;
    phoneNumber: string;
    address: string;
    date: string; // Format: YYYY-MM-DD
    time: string; // Format: HH:mm
    fetchData: () => void
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    id,
    customerName,
    email,
    phoneNumber,
    address,
    date,
    time,
    fetchData
}) => {

    const [loading, setLoading] = useState(false)

    async function handleCancelAppointment() {
        try {
            const data = {
                id
            }

            setLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel-appointment`, data)
            setLoading(false)

            console.log(response)

            fetchData()

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
            {/* Card Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h2 className="text-xl font-semibold">{customerName}</h2>
                <p className="text-sm text-blue-200">{email}</p>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-gray-600 font-medium">Phone Number</h3>
                    <p className="text-gray-800">{phoneNumber}</p>
                </div>

                <div>
                    <h3 className="text-gray-600 font-medium">Address</h3>
                    <p className="text-gray-800">{address}</p>
                </div>

                <div>
                    <h3 className="text-gray-600 font-medium">Appointment Date</h3>
                    <p className="text-gray-800">{date}</p>
                </div>

                <div>
                    <h3 className="text-gray-600 font-medium">Appointment Time</h3>
                    <p className="text-gray-800">{time}</p>
                </div>
            </div>

            {/* Card Footer with Cancel Button */}
            <div className="p-4 bg-gray-50 flex justify-end">
                <button
                    onClick={handleCancelAppointment}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                    {loading == true ? 'Canceling...' : 'Cancel'}
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard;
