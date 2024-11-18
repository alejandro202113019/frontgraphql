import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bienvenido, {user?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/products"
              className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Productos</h3>
              <p className="text-gray-600">Gestionar productos y categorías</p>
            </Link>
            <Link
              to="/add-product"
              className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Añadir Producto</h3>
              <p className="text-gray-600">Crear un nuevo producto</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;