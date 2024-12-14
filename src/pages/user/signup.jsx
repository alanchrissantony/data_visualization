import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/otpModal'; // Import the Modal component
import { useDispatch, useSelector } from 'react-redux';
import { registerUser , verifyOtp } from '../../slices/userSlice'; // Import actions

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error:reduxError, userInfo } = useSelector((state) => state.user); // Get loading and error from Redux state
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
    if (userInfo) {
      navigate('/'); // Redirect to dashboard if user is authenticated
    }
  }, [userInfo, navigate]);

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Step 1: Send username and email to get OTP
    const response = await dispatch(registerUser (formData));
  
    if (response.error) {      
      setError(response.payload.error);
    } else {
      setIsModalOpen(true); // Open OTP modal
      setIsTimerActive(true); // Start the timer
      setTimeLeft(60); // Reset timer to 60 seconds
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    // Step 2: Verify OTP
    const otpData = { email: formData.email, otp };
    const response = await dispatch(verifyOtp(otpData)); // Dispatch the verifyOtp action
    
    if (response.error) {
      setError(response.payload.error);
    } else {
      // Handle successful registration (e.g., redirect to login or dashboard)
      console.log('User  registered successfully:', response.payload);
      setIsModalOpen(false); // Close the modal
      navigate('/signin')
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='xl:w-1/4 lg:w-1/3 md:w-3/5 bg-white p-8 shadow-lg border border-gray-100 rounded-lg'>
        <div>
          <h1 className='text-4xl text-gray-900 font-semibold mb-4'>Sign up</h1>
        </div>
        {error && (
          <p className='text-center' style={{ color: 'red' }}>
            {Array.isArray(error) ? error[0] : error}
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
            {loading ? 'Registering...' : 'Continue'}
          </button>
        </form>
      </div>
      <div className='mt-4'>
        <p className='text-gray-700'>
          Already have an account?{' '}
          <Link to={'/signin'} className='text-blue-500 font-semibold'>Sign in</Link>
        </p>
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
              <Link to={'/resend'} className='text-blue-500 font-semibold'>Resend OTP</Link>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Signup;