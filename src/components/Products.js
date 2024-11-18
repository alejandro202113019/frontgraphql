import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCTS, DELETE_PRODUCT } from '../graphql/queries';
import Navbar from './Navbar';

const Products = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct({ variables: { id } });
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
      }
    }
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="text-center py-10">Cargando...</div>
      </div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Productos</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/add-product')}
          >
            Añadir Producto
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.getProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow bg-white">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.value}</p>
              <p className="text-sm text-gray-500">Categoría: {product.category?.name}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;