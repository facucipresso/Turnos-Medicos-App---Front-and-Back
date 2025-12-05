package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.Antecedentes;
import com.example.proyectoTurnosMedicos.Entity.DTO.AntecedenteDto;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.AntecedenteRepository;
import com.example.proyectoTurnosMedicos.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;

@Service
public class AntecedenteServiceImp implements AntecedenteService{

    @Autowired
    AntecedenteRepository antecedenteRepository;

    @Autowired
    PacienteRepository pacienteRepository;


    @Override
    public AntecedenteDto getAntecedenteById(Long id_paciente) {
        Antecedentes antecedentes = antecedenteRepository.findByPacienteId(id_paciente).
                orElseThrow(()->new BadRequestException("Paciente sin antecedentes cargados"));
        AntecedenteDto antecedenteDto = new AntecedenteDto();
        antecedenteDto.setDescripcionAntecedentes(antecedentes.getDescripcion());
        return antecedenteDto;
    }


    @Override
    public AntecedenteDto createAntenecedente(Long id_paciente, AntecedenteDto antecedenteDto) {
        Paciente paciente = pacienteRepository.findById(id_paciente).
                orElseThrow(()-> new BadRequestException("Id del paciente no encontrado"));
        if(antecedenteRepository.findByPacienteId(id_paciente).isPresent()){
            throw new RuntimeException("Paciente con antecedentes ya cargados");
        }
        StringBuilder sb = new StringBuilder();
        sb.append(LocalDate.now()).append(" - ").append(antecedenteDto.getDescripcionAntecedentes());
        Antecedentes antecedente = new Antecedentes();
        antecedente.setPaciente(paciente);
        antecedente.setDescripcion(sb.toString());
        Antecedentes ant = antecedenteRepository.save(antecedente);
        antecedenteDto.setDescripcionAntecedentes(ant.getDescripcion());
        return antecedenteDto;
    }

    @Override
    public AntecedenteDto updateAntecedentes(Long id_paciente, AntecedenteDto antecedenteDto) {
        Antecedentes antecedentes = antecedenteRepository.findByPacienteId(id_paciente).
                orElseThrow(()->new ResourceNotFoundException("Paciente sin antecedentes"));
        StringBuilder sb = new StringBuilder();
        if(antecedentes.getDescripcion() != null){
            sb.append(antecedentes.getDescripcion()).append(" \\ ");
        }
        sb.append(LocalDate.now()).append(" - ").append(antecedenteDto.getDescripcionAntecedentes());
        antecedentes.setDescripcion(sb.toString());
        Antecedentes ant = antecedenteRepository.save(antecedentes);
        antecedenteDto.setDescripcionAntecedentes(ant.getDescripcion());

        return antecedenteDto;
    }


}
