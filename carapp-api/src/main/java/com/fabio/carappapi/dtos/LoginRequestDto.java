package com.fabio.carappapi.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDto {
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo es inválido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}
