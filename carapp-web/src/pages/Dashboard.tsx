import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { carService } from '../services/carService';
import type { Car, CarFormData } from '../types';
import CarList from '../components/CarList';
import CarForm from '../components/CarForm';
import SearchFilter from '../components/SearchFilter';

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getAllCars();
      setCars(data);
      setError('');
    } catch (err: any) {
      setError('Error al cargar los autos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (params: {
    plateNumber?: string;
    model?: string;
    year?: number;
    brand?: string;
  }) => {
    try {
      setLoading(true);
      const data = await carService.searchCars(params);
      setCars(data);
      setError('');
    } catch (err: any) {
      setError('Error al buscar autos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (carData: CarFormData | FormData) => {
    try {
      if (editingCar) {
        await carService.updateCar(editingCar.id, carData as any);
      } else {
        await carService.createCar(carData as any);
      }
      setShowForm(false);
      setEditingCar(null);
      fetchCars();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error al guardar el auto');
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este auto?')) {
      try {
        await carService.deleteCar(id);
        fetchCars();
      } catch (err: any) {
        setError('Error al eliminar el auto');
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const handleNewCar = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mis Autos
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Bienvenido, {user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <SearchFilter onSearch={handleSearch} onReset={fetchCars} />

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Lista de Vehículos ({cars.length})
          </h2>
          <button
            onClick={handleNewCar}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            + Agregar Auto
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        ) : (
          <CarList cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {showForm && (
          <CarForm
            car={editingCar}
            onSubmit={handleCreateOrUpdate}
            onClose={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
