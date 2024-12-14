import React from 'react';
import ServiceCard from './serviceCard';
import '../../App.css';

const ServiceListHorizontal = ({ services }) => {
  return (
    <div className="row">
        <h1 className='text-lg font-bold text-gray-500 pl-5'>Services</h1>
      <div className="posters">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceListHorizontal;