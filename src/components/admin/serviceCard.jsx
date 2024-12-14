import React from 'react';
import '../../App.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-64 m-2 poster">
      {service.vehicleImage && (
        <img
          src={service.vehicleImage}
          alt="Vehicle"
          className="w-64 h-64 object-cover"
        />
      )}
      <div className="p-4 flex-grow fade-out-horizontal">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <span className="text-xs text-gray-600">{service.serviceDescription}</span>
      </div>
    </div>
  );
};

export default ServiceCard;