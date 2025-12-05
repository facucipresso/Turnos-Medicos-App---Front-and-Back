package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.Antecedentes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AntecedenteRepository extends JpaRepository<Antecedentes, Long> {
    Optional<Antecedentes> findByPacienteId(Long id_paciente);
}
