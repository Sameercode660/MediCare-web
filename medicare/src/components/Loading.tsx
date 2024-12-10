import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
        {/* Text */}
        <p className="mt-4 text-lg font-medium text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
