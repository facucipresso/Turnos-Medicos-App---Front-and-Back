package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    //Optional<Paciente> findPacienteByEmail(String Email);
    Optional<Paciente> findByUsuario_Id(Long id_usuario);

    @Query("""
        SELECT p FROM Paciente p
        WHERE p.usuario.email = :email
        AND p.dni = :dni
    """)
    Optional<Paciente> findPacienteByEmailAndDni(String email, String dni);
}
