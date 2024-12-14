// Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ isRunning }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const remainingSeconds = sec % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold">Timer</h2>
            <p className="text-2xl">{formatTime(seconds)}</p>
        </div>
    );
};

export default Timer;