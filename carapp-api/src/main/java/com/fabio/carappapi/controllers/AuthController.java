package com.fabio.carappapi.controllers;

import com.fabio.carappapi.dtos.LoginResponseDto;
import com.fabio.carappapi.dtos.LoginRequestDto;
import com.fabio.carappapi.dtos.RegisterRequestDto;
import com.fabio.carappapi.dtos.UserResponseDto;
import com.fabio.carappapi.entities.User;
import com.fabio.carappapi.security.JwtUtil;
import com.fabio.carappapi.services.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody @Valid RegisterRequestDto userDto) {
        User created = userService.registerUser(userDto);
        UserResponseDto resp = new UserResponseDto(created.getId(), created.getName(), created.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto authDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDto.getEmail(), authDto.getPassword()));
            String token = jwtUtil.generateToken(authDto.getEmail());

            User userEntity = userService.findByEmail(authDto.getEmail());
            UserResponseDto userDto = null;
            if (userEntity != null) {
                userDto = new UserResponseDto(userEntity.getId(), userEntity.getName(), userEntity.getEmail());
            }

            LoginResponseDto resp = new LoginResponseDto(token, jwtUtil.getExpirationMs(), userDto);
            return ResponseEntity.ok(resp);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
