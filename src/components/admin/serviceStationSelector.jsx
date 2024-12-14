// ServiceStationSelector.js
import React from 'react';

const ServiceStationSelector = ({ onSelectStation }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold">Select Service Station</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['A', 'B', 'C', 'D'].map(station => (
                    <button
                        key={station} 
                        onClick={() => onSelectStation(station)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1"
                    >
                        Station {station}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceStationSelector;