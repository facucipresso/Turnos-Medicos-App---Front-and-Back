package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoRequestDto;

import java.util.List;

public interface HistorialMedicoService {
    List<HistorialMedicoRequestDto> findByPacienteId(Long id_paciente);
    HistorialMedicoRequestDto addHistorialMedico(Long id_medico, Long id_paciente, HistorialMedicoDto historialMedicoDto);
    void deleteHistorialMedico(Long id_medico,Long id_paciente,Long id_historial);
}
