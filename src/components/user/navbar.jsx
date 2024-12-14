import React from 'react';
import { logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
        navigate('/signin')
      }
    return (
        <nav className="w-full bg-gray-400 p-4 flex justify-between items-center">
            <div className="text-white text-lg font-bold">User</div>
            <div>

                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </nav>
    );
};

export default Navbar;