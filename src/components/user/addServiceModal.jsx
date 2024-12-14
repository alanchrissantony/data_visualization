import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import '../../App.css';

const AddServiceModal = ({ onClose, onAddService }) => {
    const [serviceName, setServiceName] = useState('');
    const [status, setStatus] = useState('Waiting');
    const [vehicleType, setVehicleType] = useState('Car');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [vehicleImage, setVehicleImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVehicleImage(file); // Store the file for upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', serviceName);
        formData.append('status', status);
        formData.append('vehicle_type', vehicleType);
        formData.append('vehicle_number', vehicleNumber);
        formData.append('user_email', userEmail);
        formData.append('service_description', serviceDescription);
        formData.append('token_number', uuidv4()); // Generate token number
        formData.append('job_number', Date.now()); // Generate job number
        if (vehicleImage) {
            formData.append('vehicle_image', vehicleImage); // Append the image file
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/services/', formData);
            onAddService(response.data); // Pass the newly created service to the parent component
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Service</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Service Name" 
                        value={serviceName} 
                        onChange={(e) => setServiceName(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    />
                    <select 
                        value={vehicleType} 
                        onChange={(e) => setVehicleType(e.target.value)} 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    >
                        <option value="Car">Car</option>
                        <option value="Bus">Bus</option>
                        <option value="Truck">Truck</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Vehicle Number" 
                        value={vehicleNumber} 
                        onChange={(e) => setVehicleNumber(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    />
                    <input 
                        type="email" 
                        placeholder="User  Email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    />
                    <textarea 
                        placeholder="Service Description" 
                        value={serviceDescription} 
                        onChange={(e) => setServiceDescription(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                    />
                    {vehicleImage && (
                        <img 
                            src={URL.createObjectURL(vehicleImage)} 
                            alt="Vehicle" 
                            className="w-full h-32 object-cover rounded mb-4" 
                        />
                    )}
                    <div className="flex justify-between">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Service</button>
                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;