package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
    boolean existsByNombre(String nombre);
}

