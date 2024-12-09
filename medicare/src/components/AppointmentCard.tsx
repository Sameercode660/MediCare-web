'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface propsType {
    customerName: string
    appointmentDate: string
    status: string
}

function AppointmentCard({ customerName, appointmentDate, status }: propsType) {


  const router = useRouter()

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-2">
          Appointment Details
        </h2>

        {/* Customer Name */}
        <div className="mt-4">
          <h3 className="text-gray-600 text-sm font-medium">Customer Name</h3>
          <p className="text-lg font-semibold text-gray-800">{customerName}</p>
        </div>

        {/* Appointment Date & Time */}
        <div className="mt-4">
          <h3 className="text-gray-600 text-sm font-medium">Appointment Date & Time</h3>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(appointmentDate).toLocaleString()}
          </p>
        </div>

        {/* Status */}
        <div className="mt-4">
          <h3 className="text-gray-600 text-sm font-medium">Status</h3>
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-lg ${getStatusClass(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            className="w-full py-3 text-white text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
            onClick={() => router.push('/main')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
