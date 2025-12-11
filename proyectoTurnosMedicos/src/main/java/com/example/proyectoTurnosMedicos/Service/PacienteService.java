package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.EmailDNIUser;
import com.example.proyectoTurnosMedicos.Entity.DTO.PacienteDto;
import com.example.proyectoTurnosMedicos.Entity.Paciente;

import java.util.List;

public interface PacienteService {

    PacienteDto cretePaciente(PacienteDto pacientedto);
    PacienteDto updatePaciente(Long id_paciente, PacienteDto pacienteDto);
    List<PacienteDto> findAllPacientes();
    void deletePacienteById(Long id_paciente);
    PacienteDto getPacienteById(Long id);
    PacienteDto getIdByPacienteEmailandDni(EmailDNIUser emailDNIUser);

}
