'use client';

import React from "react";

function ServiceCard() {
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-[90%] max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image */}
                <div className="h-48">
                    <img
                        src="https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Service"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        Premium Health Consultation
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">
                        Experience top-tier health consultation services with our expert team.
                        Tailored care for your well-being.
                    </p>

                    {/* Button */}
                    <button className="w-full py-3 text-white text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none">
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;
