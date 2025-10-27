import api from './api';
import type { Car, CarFormData } from '../types';

export const carService = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>('/cars');
    return response.data;
  },

  createCar: async (carData: CarFormData): Promise<Car> => {
    const response = await api.post<Car>('/cars', carData);
    return response.data;
  },

  updateCar: async (id: number, carData: CarFormData): Promise<Car> => {
    const response = await api.put<Car>(`/cars/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id: number): Promise<void> => {
    await api.delete(`/cars/${id}`);
  },

  searchCars: async (params: {
    plateNumber?: string;
    model?: string;
    year?: number;
    brand?: string;
  }): Promise<Car[]> => {
    const queryParams = new URLSearchParams();
    if (params.plateNumber) queryParams.append('plateNumber', params.plateNumber);
    if (params.model) queryParams.append('model', params.model);
    if (params.year) queryParams.append('year', params.year.toString());
    if (params.brand) queryParams.append('brand', params.brand);

    const response = await api.get<Car[]>(`/cars/search?${queryParams.toString()}`);
    return response.data;
  },
};
