package com.fabio.carappapi.services;

import com.fabio.carappapi.dtos.CarRequestDto;
import com.fabio.carappapi.dtos.CarResponseDto;
import com.fabio.carappapi.entities.Car;
import com.fabio.carappapi.entities.User;
import com.fabio.carappapi.repositories.CarRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public CarResponseDto createCar(CarRequestDto dto, User user) {
        String plate = dto.getPlateNumber();
        if (carRepository.existsByPlateNumber(plate)) {
            throw new RuntimeException("Ya existe un vehículo con esa placa");
        }
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setPlateNumber(plate);
        car.setColor(dto.getColor());
        car.setUser(user);

        Car saved = carRepository.save(car);
        return toDto(saved);
    }

    public List<CarResponseDto> getCarsByUser(User user) {
        return carRepository.findByUser(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CarResponseDto updateCar(Long id, CarRequestDto dto, User user) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto no encontrado"));

        if (!car.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No autorizado");
        }

        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setPlateNumber(dto.getPlateNumber());
        car.setColor(dto.getColor());

        Car updated = carRepository.save(car);
        return toDto(updated);
    }

    public void deleteCar(Long id, User user) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auto no encontrado"));
        if (!car.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No autorizado");
        }
        carRepository.delete(car);
    }

    public List<CarResponseDto> searchByPlateNumber(User user, String plateNumber) {
        return carRepository.findByUserAndPlateNumberContainingIgnoreCase(user, plateNumber)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<CarResponseDto> searchByModel(User user, String model) {
        return carRepository.findByUserAndModelContainingIgnoreCase(user, model)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<CarResponseDto> filterByYear(User user, Integer year) {
        return carRepository.findByUserAndYear(user, year)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<CarResponseDto> filterByBrand(User user, String brand) {
        return carRepository.findByUserAndBrandContainingIgnoreCase(user, brand)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private CarResponseDto toDto(Car car) {
        return new CarResponseDto(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getPlateNumber(),
                car.getColor(),
                car.getPhotoUrl());
    }
}
