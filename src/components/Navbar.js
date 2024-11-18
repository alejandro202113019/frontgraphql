// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="font-bold text-xl">
              Mi App
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/products"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Productos
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Hola, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;