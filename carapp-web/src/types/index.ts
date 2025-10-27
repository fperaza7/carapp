export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  photoUrl?: string;
}

export interface CarFormData {
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  photoUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
