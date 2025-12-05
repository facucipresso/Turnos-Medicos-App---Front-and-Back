package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.*;
import com.example.proyectoTurnosMedicos.Entity.DTO.PacienteDto;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.PacienteRepository;
import com.example.proyectoTurnosMedicos.Repository.ReservaRepository;
import com.example.proyectoTurnosMedicos.Repository.TurnoRepository;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PacienteServiceImp implements PacienteService{

    @Autowired
    PacienteRepository pacienteRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    ReservaRepository reservaRepository;

    @Autowired
    TurnoRepository turnoRepository;

    private boolean isNullOrBlank(String str){
        return str == null || str.trim().isEmpty();
    }

    @Override
    public PacienteDto cretePaciente(PacienteDto pacienteDto) {
        if(isNullOrBlank(pacienteDto.getNombre()) || isNullOrBlank(pacienteDto.getApellido()) || isNullOrBlank(pacienteDto.getDireccion())){
            throw new BadRequestException("Campos incompletos");
        }

        Usuario usuario = usuarioRepository.findById(pacienteDto.getIdUsuario()).
                orElseThrow(()-> new BadRequestException("Usuario no encontrado"));

        Paciente p = new Paciente();
        p.setNombre(pacienteDto.getNombre());
        p.setApellido(pacienteDto.getApellido());
        p.setDireccion(pacienteDto.getDireccion());
        //p.setEmail(pacienteDto.getEmail());
        p.setUsuario(usuario);

        Paciente pac = pacienteRepository.save(p);
        pacienteDto.setId(pac.getId());
        pacienteDto.setNombre(pac.getNombre());
        pacienteDto.setApellido(pac.getApellido());
        pacienteDto.setDireccion(pac.getDireccion());
        //pacienteDto.setEmail(pac.getEmail());
        pacienteDto.setIdUsuario(pac.getUsuario().getId());

        return pacienteDto;
    }

    @Override
    public PacienteDto updatePaciente(Long id_paciente, PacienteDto pacienteDto) {
        if(isNullOrBlank(pacienteDto.getNombre()) || isNullOrBlank(pacienteDto.getApellido()) || isNullOrBlank(pacienteDto.getDireccion())){
            throw new BadRequestException("Campos incompletos");
        }
        Paciente p = pacienteRepository.findById(id_paciente).
                orElseThrow(()-> new ResourceNotFoundException("Paciente no encontrado"));
        p.setNombre(pacienteDto.getNombre());
        p.setApellido(pacienteDto.getApellido());
        p.setDireccion(pacienteDto.getDireccion());
        //p.setEmail(pacienteDto.getEmail());
        //si no seteo el rol, se queda con el que trajo desde el repository

        Paciente pa = pacienteRepository.save(p);
        pacienteDto.setId(pa.getId());
        pacienteDto.setNombre(pa.getNombre());
        pacienteDto.setApellido(pa.getApellido());
        pacienteDto.setDireccion(pa.getDireccion());
        //pacienteDto.setEmail(pa.getEmail());
        pacienteDto.setIdUsuario(pa.getUsuario().getId());

        return pacienteDto;
    }

    @Override
    public List<PacienteDto> findAllPacientes() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        List<PacienteDto> pacientesDtos = new ArrayList<>();
        for (Paciente p : pacientes) {
            PacienteDto pdto = new PacienteDto();
            pdto.setId(p.getId());
            pdto.setNombre(p.getNombre());
            pdto.setApellido(p.getApellido());
            pdto.setDireccion(p.getDireccion());
            //pdto.setEmail(p.getEmail());
            pdto.setIdUsuario(p.getUsuario().getId());
            pacientesDtos.add(pdto);
        }
        return pacientesDtos;
    }

    @Override
    public void deletePacienteById(Long id_paciente) {
        if(pacienteRepository.findById(id_paciente).isEmpty()){
            throw new BadRequestException("Paciente inexistente");
        }

        List<Reserva> reservas = reservaRepository.getReservasByPaciente_Id(id_paciente);

        for(Reserva reserva : reservas){
            Turno turno = reserva.getTurno();
            turno.setReservado(false);
            turnoRepository.save(turno);

            reservaRepository.delete(reserva);
        }

        pacienteRepository.deleteById(id_paciente);
    }

    @Override
    public PacienteDto getPacienteById(Long id) {
        Paciente p = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado"));
        PacienteDto dto = new PacienteDto();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setApellido(p.getApellido());
        dto.setDireccion(p.getDireccion());
        //dto.setEmail(p.getEmail());
        dto.setIdUsuario(p.getUsuario().getId());
        return dto;
    }

}
