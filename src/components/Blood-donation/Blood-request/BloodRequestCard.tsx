import React from 'react';

const BloodRequestCard = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Blood Request</h2>
      <div className="text-gray-700 text-base space-y-2">
        <p><span className="font-semibold">Name:</span> John Doe</p>
        <p><span className="font-semibold">Patient Name:</span> Jane Doe</p>
        <p><span className="font-semibold">Patient Problem:</span> Severe Anemia</p>
        <p><span className="font-semibold">Mobile Number:</span> +880123456789</p>
        <p><span className="font-semibold">Blood Group:</span> A+</p>
        <p><span className="font-semibold">Hospital Name:</span> Kurigram General Hospital</p>
      </div>
    </div>
  )
}

export default BloodRequestCard
