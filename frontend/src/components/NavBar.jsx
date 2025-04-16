import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UseContext';

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null); // Clear context
      navigate('/'); //  Redirect to login page
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AI QUIZ APP
          </span>
        </a>

        <button
          onClick={handleLogout}
          className="text-lg font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-red-100 hover:text-red-600 transition-all"
          title="Click to logout"
        >
          Welcome: {user?.email || 'Guest'} <span className="ml-1">🔓</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
