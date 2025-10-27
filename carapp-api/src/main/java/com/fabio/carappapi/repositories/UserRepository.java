package com.fabio.carappapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fabio.carappapi.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
