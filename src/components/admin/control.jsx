// ControlButtons.js
import React from 'react';

const ControlButtons = ({ onStart, onStop }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold">Control</h2>
            <div className="flex space-x-2">
                <button 
                    onClick={onStart} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Start
                </button>
                <button 
                    onClick={onStop} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Stop
                </button>
            </div>
        </div>
    );
};

export default ControlButtons;