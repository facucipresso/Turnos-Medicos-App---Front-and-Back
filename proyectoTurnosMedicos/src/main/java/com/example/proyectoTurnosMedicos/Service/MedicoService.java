package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.MedicoDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.MedicoFullDto;
import com.example.proyectoTurnosMedicos.Entity.Medico;

import java.util.List;
import java.util.Set;

public interface MedicoService {
    Medico agregarObraSocial(Long id_medico, Long id_obraSocial);
    MedicoFullDto createMedico(MedicoFullDto medicoFullDto);
    List<MedicoDto> findAllMedicos();
    List<MedicoFullDto> findAllMedicosFull();
    MedicoFullDto updateMedico(Long id_medico, MedicoFullDto medicoFullDto);
    Medico findMedicoById(Long id_medico);
    void deleteMedicoById(Long id_medico);
    Medico deleteObraSocial(Long id_medico, Long id_obraSocial);
    List<MedicoDto> findMedicoByEspecialidad(Long idEspecialidad);
    MedicoDto obtenerMedicoPorTurno(Long idTurno);
    List<MedicoDto> getMedicosByObraSocial(Long id_obraSocial);
}
