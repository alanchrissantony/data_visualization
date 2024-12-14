// ServiceInfo.js
import React from 'react';

const ServiceInfo = ({ token, jobNumber, vehicleType, vehicleNumber, time }) => {
    return (
        <div className=" bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold">Service Information</h2>
            <p><strong>Token:</strong> {token}</p>
            <p><strong>Job Number:</strong> {jobNumber}</p>
            <p><strong>Vehicle Type:</strong> {vehicleType}</p>
            <p><strong>Vehicle Number:</strong> {vehicleNumber}</p>
            <p><strong>Time:</strong> {time}</p>
        </div>
    );
};

export default ServiceInfo;