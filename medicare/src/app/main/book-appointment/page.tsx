'use client';

import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";

function Page() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {


        if (!fullName || !email || !mobileNumber || !address || !appointmentDate) {
            alert('Anyone field is empty')
            return;
        }

        const appointmentDetails = {
            fullName,
            userId: localStorage.getItem("id")?.toString(),
            email,
            mobileNumber,
            address,
            appointmentDate: new Date(appointmentDate).toISOString(),
        };
        console.log(appointmentDetails)
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book-appointment`, appointmentDetails)
            setLoading(false)

            console.log(response)

            if (response.data.status == true) {
                router.push('/appointment')
            } else {
                alert('Unable to book the appointment')
            }
        } catch (error) {
            console.log(error)
        }



    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Book Appointment
                </h2>

                {/* Full Name */}
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your full name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your mobile number"
                    />
                </div>

                {/* Address */}
                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Address
                    </label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your address"
                    ></textarea>
                </div>

                {/* Appointment Date */}
                <div>
                    <label
                        htmlFor="appointmentDate"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Appointment Date
                    </label>
                    <input
                        type="datetime-local"
                        id="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 text-white text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
                >

                    {
                        loading == true ? 'Booking...' : 'Book Appointment'
                    }
                </button>
            </div>
        </div>
    );
}

export default Page;

