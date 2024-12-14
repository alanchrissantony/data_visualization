import React, { useState, useEffect } from 'react';
import ServiceListHorizontal from '../../components/admin/serviceListHorizontal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Navbar from '../../components/admin/navbar';

function AdminDashboard() {
  const navigate = useNavigate()
  const { loading, error: reduxError, userInfo } = useSelector((state) => state.admin);
  useEffect(() => {
    if (!userInfo) {
      navigate('/admin/signin'); // Redirect to dashboard if user is authenticated
    }
  }, [userInfo, navigate]);
  const [services, setServices] = useState([
    {
      name: 'Oil Change',
      serviceDescription: 'Complete oil change service.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Tire Rotation',
      serviceDescription: 'Rotate tires for even wear.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Brake Inspection',
      serviceDescription: 'Inspect and replace brake pads.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Battery Check',
      serviceDescription: 'Check battery health and replace if necessary.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Transmission Service',
      serviceDescription: 'Complete transmission fluid change.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Oil Change',
      serviceDescription: 'Complete oil change service.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Tire Rotation',
      serviceDescription: 'Rotate tires for even wear.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Brake Inspection',
      serviceDescription: 'Inspect and replace brake pads.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Battery Check',
      serviceDescription: 'Check battery health and replace if necessary.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    {
      name: 'Transmission Service',
      serviceDescription: 'Complete transmission fluid change.',
      vehicleImage: 'https://via.placeholder.com/150',
    },
    // Add more services as needed
  ]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full">
        <ServiceListHorizontal services={services} />
      </div>
    </div>
    </>
    
  );
}

export default AdminDashboard;