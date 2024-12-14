import React, { useState, useEffect } from 'react';
import AddServiceModal from './AddServiceModal';
import axios from 'axios';
import '../../App.css';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch services when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/services/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include JWT token if needed
                    },
                });
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleAddService = (newService) => {
        setServices([...services, newService]); // Add the new service to the list
        setIsModalOpen(false); // Close the modal after adding the service
    };

    return (
        <div className="w-11/12 mx-auto p-6 m-5 bg-gray-100 rounded-lg shadow-md">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold mb-4">Service List</h2>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                </button>
            </div>

            <ul className="space-y-2">
                {services.map((service, index) => (
                    <li key={index} className="bg-white p-3 rounded shadow">
                        <div className="flex justify-between">
                            <span>{service.job_number}</span>
                            <span>{service.name}</span>
                            <span>{service.vehicle_type}</span>
                            <span>{service.vehicle_number}</span>
                            <span className="text-gray-500">{service.status}</span>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <AddServiceModal
                    onClose={() => setIsModalOpen(false)}
                    onAddService={handleAddService}
                />
            )}
        </div>
    );
};

export default ServiceList