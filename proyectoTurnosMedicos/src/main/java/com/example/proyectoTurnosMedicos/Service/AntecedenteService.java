package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.AntecedenteDto;

public interface AntecedenteService {
    AntecedenteDto getAntecedenteById(Long id_paciente);
    AntecedenteDto createAntenecedente(Long id_paciente, AntecedenteDto antecedenteDto);
    AntecedenteDto updateAntecedentes(Long id_paciente,AntecedenteDto antecedenteDto);
}
