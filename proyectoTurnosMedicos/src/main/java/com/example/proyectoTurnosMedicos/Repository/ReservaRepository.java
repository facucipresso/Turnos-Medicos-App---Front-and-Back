package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaDto;
import com.example.proyectoTurnosMedicos.Entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> getReservasByPaciente_Id(Long idPaciente);
    List<Reserva> findByTurno_Medico_Id(Long idMedico);
}
