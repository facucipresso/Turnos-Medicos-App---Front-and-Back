package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.TurnoDTO;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.Turno;
import com.example.proyectoTurnosMedicos.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface TurnoService {

    TurnoDTO createTurno(Long id_medico, TurnoDTO turno);
    TurnoDTO updateTurno(Long id_medico, Long id_turno, TurnoDTO turnoDTO);
    void deleteTurno(Long id_medico, Long id_turno);
    List<Turno> findTurnosByMedico(Long id_medico);
    Turno findTurnoById(Long id_turno);
    boolean reservarTurno(Long id_turno);
    List<Turno> findTurnosReservados(Long id_medico);
    List<Turno> getTurnosPorMedicos(List<Long> idList);
}
