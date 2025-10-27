package com.fabio.carappapi.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fabio.carappapi.dtos.CarRequestDto;
import com.fabio.carappapi.dtos.CarResponseDto;
import com.fabio.carappapi.entities.User;
import com.fabio.carappapi.services.CarService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public ResponseEntity<List<CarResponseDto>> listCars(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(carService.getCarsByUser(user));
    }

    @PostMapping
    public ResponseEntity<CarResponseDto> createCar(@AuthenticationPrincipal User user,
            @RequestBody @Valid CarRequestDto dto) {
        CarResponseDto created = carService.createCar(dto, user);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarResponseDto> updateCar(@AuthenticationPrincipal User user, @PathVariable Long id,
            @RequestBody @Valid CarRequestDto dto) {
        return ResponseEntity.ok(carService.updateCar(id, dto, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@AuthenticationPrincipal User user, @PathVariable Long id) {
        carService.deleteCar(id, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<CarResponseDto>> searchCars(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) String plateNumber,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String brand) {

        if (plateNumber != null && !plateNumber.isEmpty()) {
            return ResponseEntity.ok(carService.searchByPlateNumber(user, plateNumber));
        }
        if (model != null && !model.isEmpty()) {
            return ResponseEntity.ok(carService.searchByModel(user, model));
        }
        if (year != null) {
            return ResponseEntity.ok(carService.filterByYear(user, year));
        }
        if (brand != null && !brand.isEmpty()) {
            return ResponseEntity.ok(carService.filterByBrand(user, brand));
        }

        return ResponseEntity.ok(carService.getCarsByUser(user));
    }
}
