import React, { useState, useEffect } from 'react';
import '../../App.css';
import Modal from '../../components/otpModal'; // Import the Modal component
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { useDispatch, useSelector } from 'react-redux';
import { sendAdminOtp, verifyAdminOtp } from '../../slices/adminSlice'; // Import actions

function AdminSignin() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigation after successful sign-in
    const { loading, error: reduxError, adminInfo } = useSelector((state) => state.admin); // Get loading and error from Redux state
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
    const [isTimerActive, setIsTimerActive] = useState(false); // Timer should start when OTP is requested

    useEffect(() => {
        let timer;
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false); // Stop the timer when it reaches 0
        }
        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);

    useEffect(() => {
        if (adminInfo) {
          navigate('/admin'); // Redirect to dashboard if user is authenticated
        }
      }, [adminInfo, navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(sendAdminOtp(formData));
        if (response.error) {
            setError(response.payload.error || 'An error occurred while sending OTP.');
        } else {
            setIsModalOpen(true); // Open OTP modal
            setIsTimerActive(true); // Start the timer
            setTimeLeft(60); // Reset timer to 60 seconds
            setError(null); // Clear any previous errors
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        const otpData = { email: formData.email, otp };
        const response = await dispatch(verifyAdminOtp(otpData));
        if (response.error) {
            setError(response.payload.error || 'Invalid OTP. Please try again.');
        } else {
            console.log('Admin signed in successfully:', response.payload);
            setIsModalOpen(false); // Close the modal
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        }
    };

    const handleResendOtp = async () => {
        const response = await dispatch(sendAdminOtp(formData));
        if (response.error) {
            setError(response.payload.error || 'An error occurred while resending OTP.');
        } else {
            setTimeLeft(60); // Reset timer to 60 seconds
            setIsTimerActive(true); // Start the timer again
            setError(null); // Clear any previous errors
        }
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='xl:w-1/4 lg:w-1/3 md:w-3/5 bg-white p-8 shadow-lg border border-gray-100 rounded-lg'>
                <h1 className='text-4xl text-gray-900 font-semibold mb-4'>Admin Sign in</h1>
                {error && (
                    <p className='text-center' style={{ color: 'red' }}>
                        {typeof error === 'string' ? error : 'An unexpected error occurred.'}
                    </p>
                )}
                {reduxError && (
                    <p className='text-center' style={{ color: 'red' }}>
                        {typeof reduxError === 'string' ? reduxError : Array.isArray(reduxError) ? reduxError[0] : 'An unexpected error occurred.'}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type="text"
                        name='username'
                        placeholder='Username'
                        className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3'
                        required
                    />
                    <input
                        onChange={handleChange}
                        type="email"
                        name='email'
                        placeholder='Email'
                        className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3 mb-3'
                        required
                    />
                    <br />
                    <button
                        type='submit'
                        className='border bg-blue-500 rounded-3xl w-11/12 h-12 font-semibold text-white mb-4 mt-3'
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Sending OTP...' : 'Continue'}
                    </button>
                </form>
            </div>

            {/* OTP Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h1 className='text-2xl text-gray-900 font-semibold mb-4'>Enter OTP</h1>
                <form onSubmit={handleOtpSubmit}>
                    <input
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        name='otp'
                        placeholder='OTP'
                        className='w-full h-10 border border-gray-500 rounded-md p-2 text-sm mt-3'
                        required
                    />
                    <br />
                    <button
                        type='submit'
                        className='border bg-blue-500 rounded-3xl w-full h-12 font-semibold text-white mb-4 mt-3'
                    >
                        Verify OTP
                    </button>
                </form>
                <div className='mt-4'>
                    {isTimerActive ? (
                        <p className='text-gray-700'>
                            Resend OTP in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </p>
                    ) : (
                        <p className='text-gray-700'>
                            <button onClick={handleResendOtp} className='text-blue-500 font-semibold'>
                                Resend OTP
                            </button>
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default AdminSignin;