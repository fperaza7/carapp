import React from 'react';
import type { Car } from '../types';

interface CarListProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, onEdit, onDelete }) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay autos registrados</h3>
        <p className="mt-1 text-sm text-gray-500">Agrega tu primer auto</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            {car.photoUrl ? (
              <img
                src={car.photoUrl}
                alt={`${car.brand} ${car.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-white text-3xl font-bold">{car.brand} {car.model}</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {car.brand} {car.model}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Año:</span> {car.year}
              </p>
              <p>
                <span className="font-medium">Placa:</span> {car.plateNumber}
              </p>
              <p>
                <span className="font-medium">Color:</span> {car.color}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onEdit(car)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(car.id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
