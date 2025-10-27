package com.fabio.carappapi.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CarRequestDto {
    @NotBlank(message = "La marca es obligatoria")
    private String brand;

    @NotBlank(message = "El modelo es obligatorio")
    private String model;

    @NotNull(message = "El año es obligatorio")
    @Min(value = 1886, message = "El año es inválido")
    private Integer year;

    @NotBlank(message = "La placa es obligatoria")
    private String plateNumber;

    @NotBlank(message = "El color es obligatorio")
    private String color;

    private String photoUrl;
}
