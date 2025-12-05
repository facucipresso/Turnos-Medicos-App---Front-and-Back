package com.example.proyectoTurnosMedicos.Security.repository;

import com.example.proyectoTurnosMedicos.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUserByEmail(String email);
}
