package com.fabio.carappapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fabio.carappapi.entities.Car;
import com.fabio.carappapi.entities.User;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByUser(User user);
    boolean existsByPlateNumber(String plateNumber);
    List<Car> findByUserAndPlateNumberContainingIgnoreCase(User user, String plateNumber);
    List<Car> findByUserAndModelContainingIgnoreCase(User user, String model);
    List<Car> findByUserAndYear(User user, Integer year);
    List<Car> findByUserAndBrandContainingIgnoreCase(User user, String brand);
}
