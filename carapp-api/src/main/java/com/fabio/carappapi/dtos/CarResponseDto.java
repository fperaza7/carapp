package com.fabio.carappapi.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarResponseDto {
    private String id;
    private String brand;
    private String model;
    private int year;
    private String plateNumber;
    private String color;
    private String photoUrl;
}
