package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoRequestDto;
import com.example.proyectoTurnosMedicos.Entity.HistorialMedico;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistorialMedicoServiceImp implements HistorialMedicoService{

    @Autowired
    HistorialMedicoRepository historialMedicoRepository;

    @Autowired
    PacienteRepository pacienteRepository;

    @Autowired
    MedicoRepository medicoRepository;

    @Autowired
    ObraSocialRepository obraSocialRepository;

    @Autowired
    AntecedenteRepository antecedenteRepository;

    @Override
    public List<HistorialMedicoRequestDto> findByPacienteId(Long id_paciente) {
        if(pacienteRepository.findById(id_paciente).isEmpty()){
            throw new BadRequestException("Paciente inexistente");
        }
        List<HistorialMedico> historiales = historialMedicoRepository.findHistorialByPacienteId(id_paciente);
        List<HistorialMedicoRequestDto> historialDtos = new ArrayList<>();

        for(HistorialMedico historial : historiales){
            HistorialMedicoRequestDto historialMedicoRequestDto = new HistorialMedicoRequestDto();
            historialMedicoRequestDto.setId(historial.getId());
            historialMedicoRequestDto.setFechaDto(historial.getFecha());
            historialMedicoRequestDto.setNombreMedicoDto(historial.getMedico().getApellido());
            historialMedicoRequestDto.setNombrePacienteDto(historial.getPaciente().getApellido());
            historialMedicoRequestDto.setNombreObraSocialDto(historial.getObraSocial().getNombreObraSocial());
            historialMedicoRequestDto.setMedicacionActualDto(historial.getMedicacionesActuales());
            historialMedicoRequestDto.setMotivoDto(historial.getMotivo());
            historialMedicoRequestDto.setDescripcionDto(historial.getDescripcion());
            historialMedicoRequestDto.setTratamientoDto(historial.getTratamiento());
            historialMedicoRequestDto.setCostoDto(historial.getCosto());
            historialDtos.add(historialMedicoRequestDto);
        }
        return historialDtos;
    }

    @Override
    public HistorialMedicoRequestDto addHistorialMedico(Long id_medico, Long id_paciente, HistorialMedicoDto historialMedicoDto) {
        if(antecedenteRepository.findByPacienteId(id_paciente).isEmpty()){
            throw new BadRequestException("El paciente no tiene cargados sus antecedentes, primero generar una cartilla y luego aniadir historial");
        }
        Medico medico = medicoRepository.findById(id_medico).
                orElseThrow(()->new BadRequestException("Medico inexistente"));
        Paciente paciente = pacienteRepository.findById(id_paciente).
                orElseThrow(()->new BadRequestException("Paciente inexistente"));
        if(!medico.getObrasSociales().contains(obraSocialRepository.getReferenceById(historialMedicoDto.getObrasocialDto()))){
            throw new BadRequestException("Este medico no trabaja con esa obra social");
        }
        HistorialMedico historialMedico = new HistorialMedico();
        historialMedico.setFecha(historialMedicoDto.getFechaDto());
        historialMedico.setMedico(medico);
        historialMedico.setPaciente(paciente);
        historialMedico.setObraSocial(obraSocialRepository.getReferenceById(historialMedicoDto.getObrasocialDto()));
        historialMedico.setMedicacionesActuales(historialMedicoDto.getMedicacionActualDto());
        historialMedico.setMotivo(historialMedicoDto.getMotivoDto());
        historialMedico.setDescripcion(historialMedicoDto.getDescripcionDto());
        historialMedico.setTratamiento(historialMedicoDto.getTratamientoDto());
        historialMedico.setCosto(historialMedicoDto.getCostoDto());
        HistorialMedico hm = historialMedicoRepository.save(historialMedico);
        HistorialMedicoRequestDto historialMedicoRequestDto = new HistorialMedicoRequestDto();
        historialMedicoRequestDto.setId(hm.getId());
        historialMedicoRequestDto.setFechaDto(hm.getFecha());
        historialMedicoRequestDto.setNombreMedicoDto(hm.getMedico().getApellido());
        historialMedicoRequestDto.setNombrePacienteDto(hm.getPaciente().getApellido());
        historialMedicoRequestDto.setNombreObraSocialDto(hm.getObraSocial().getNombreObraSocial());
        historialMedicoRequestDto.setMedicacionActualDto(hm.getMedicacionesActuales());
        historialMedicoRequestDto.setMotivoDto(hm.getMotivo());
        historialMedicoRequestDto.setDescripcionDto(hm.getDescripcion());
        historialMedicoRequestDto.setTratamientoDto(hm.getTratamiento());
        historialMedicoRequestDto.setCostoDto(hm.getCosto());

        return historialMedicoRequestDto;
    }

    @Override
    public void deleteHistorialMedico(Long id_medico, Long id_paciente, Long id_historial) {
        Medico medico = medicoRepository.findById(id_medico).
                orElseThrow(()->new BadRequestException("Medico inexistente"));
        Paciente paciente = pacienteRepository.findById(id_paciente).
                orElseThrow(()->new BadRequestException("Paciente inexistente"));
        List<HistorialMedico> historialMedicos = historialMedicoRepository.findHistorialByPacienteId(id_paciente);
        HistorialMedico hm = historialMedicoRepository.findById(id_historial).
                orElseThrow(()->new BadRequestException("Historal inexistente"));
        historialMedicoRepository.deleteById(id_historial);
        return;
    }
}
