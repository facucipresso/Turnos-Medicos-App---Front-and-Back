package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.*;
import com.example.proyectoTurnosMedicos.Entity.DTO.PacienteDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestDto;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.ObraSocialRepository;
import com.example.proyectoTurnosMedicos.Repository.PacienteRepository;
import com.example.proyectoTurnosMedicos.Repository.ReservaRepository;
import com.example.proyectoTurnosMedicos.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaServiceImp implements ReservaService{

    @Autowired
    ReservaRepository reservaRepository;
    @Autowired
    TurnoRepository turnoRepository;
    @Autowired
    PacienteRepository pacienteRepository;
    @Autowired
    ObraSocialRepository obraSocialRepository;


    @Override
    public ReservaDto createReserva(ReservaRequestDto reservaRDto) {
        Turno t = turnoRepository.findById(reservaRDto.getIdTurno()).
                orElseThrow(()->new ResourceNotFoundException("ID del turno no encotrado"));

        List<Reserva> reservasHechas = reservaRepository.findAll();

        for(Reserva r : reservasHechas){
            if(r.getTurno().getId().equals(reservaRDto.getIdTurno())){
                throw new BadRequestException("Turno ya reservado por otro paciente");
            }
        }

        Paciente p = pacienteRepository.findById(reservaRDto.getIdPaciente()).
                orElseThrow(()->new ResourceNotFoundException("ID del paciente no encontrado"));


        //en la excepcion que tira en vez de poner runtimeexception, le pongo la que yo cree
        // ObraSocial os = obraSocialRepository.findById(reservaRDto.getIdObraSocial()).orElseThrow(() -> new RuntimeException());

        ObraSocial os = obraSocialRepository.findById(reservaRDto.getIdObraSocial()).
                orElseThrow(()->new ResourceNotFoundException("ID de la obra social no encontrado"));

        Medico med = t.getMedico();
        if(!med.getObrasSociales().contains(os)){
            throw new BadRequestException("El medico no trabaja con esa obra social");
        }

        Reserva r = new Reserva();
        r.setTurno(t);
        r.setPaciente(p);
        r.setObrasocial(os);

        //actualizo el estado reservado a true
        Turno tur = new Turno();
        tur.setId(t.getId());
        tur.setDiaTurno(t.getDiaTurno());
        tur.setHoraTurno(t.getHoraTurno());
        tur.setReservado(true);
        tur.setMedico(t.getMedico());

        reservaRepository.save(r);
        turnoRepository.save(tur);

        r.getPaciente().getReservas().add(r);

        ReservaDto rdto = new ReservaDto();
        rdto.setId(r.getId());
        rdto.setFechaReserva(r.getTurno().getDiaTurno());
        rdto.setHoraReserva(r.getTurno().getHoraTurno());
        rdto.setNombrePaciente(r.getPaciente().getNombre());
        rdto.setApellidoPaciente(r.getPaciente().getApellido());
        rdto.setApellidoMedico(r.getTurno().getMedico().getApellido());
        //rdto.setEspecialidadMedico(r.getTurno().getMedico().getEspecialidad().getNombre());
        rdto.setNombreObraSocial(r.getObrasocial().getNombreObraSocial());

        return rdto;
    }

    @Override
    public void deleteReserva(Long id_reserva) {
        Reserva reserva = reservaRepository.findById(id_reserva)
                .orElseThrow(()->new ResourceNotFoundException("Reserva no encontrada"));
        reservaRepository.delete(reserva);
        Turno turno = reserva.getTurno();
        Turno t = new Turno();
        t.setId(turno.getId());
        t.setDiaTurno(turno.getDiaTurno());
        t.setHoraTurno(turno.getHoraTurno());
        t.setReservado(false);
        t.setMedico(turno.getMedico());
        turnoRepository.save(t);

    }

    @Override
    public List<ReservaDto> getReservasPaciente(Long idPaciente){
        List<Reserva> reservasPaciente = reservaRepository.getReservasByPaciente_Id(idPaciente);
        List<ReservaDto> reservasDtoPaciente = new ArrayList<>();
        for(Reserva reserva : reservasPaciente){
            ReservaDto rdto = new ReservaDto();
            rdto.setId(reserva.getId());
            rdto.setFechaReserva(reserva.getTurno().getDiaTurno());
            rdto.setHoraReserva(reserva.getTurno().getHoraTurno());
            rdto.setNombrePaciente(reserva.getPaciente().getNombre());
            rdto.setApellidoPaciente(reserva.getPaciente().getApellido());
            rdto.setApellidoMedico(reserva.getTurno().getMedico().getApellido());
            //rdto.setEspecialidadMedico(reserva.getTurno().getMedico().getEspecialidad().getNombre());
            rdto.setNombreObraSocial(reserva.getObrasocial().getNombreObraSocial());
            reservasDtoPaciente.add(rdto);
        }
        return reservasDtoPaciente;
    }

    @Override
    public List<ReservaDto> getReservasMedico(Long id_medico){
        List<Reserva> reservasMedicos = reservaRepository.findByTurno_Medico_Id(id_medico);
        List<ReservaDto> reservasDtoMedico = new ArrayList<>();

        for(Reserva reserva : reservasMedicos){
            ReservaDto rdto = new ReservaDto();
            rdto.setId(reserva.getId());
            rdto.setFechaReserva(reserva.getTurno().getDiaTurno());
            rdto.setHoraReserva(reserva.getTurno().getHoraTurno());
            rdto.setNombrePaciente(reserva.getPaciente().getNombre());
            rdto.setApellidoPaciente(reserva.getPaciente().getApellido());
            rdto.setApellidoMedico(reserva.getTurno().getMedico().getApellido());
            //rdto.setEspecialidadMedico(reserva.getTurno().getMedico().getEspecialidad().getNombre());
            rdto.setNombreObraSocial(reserva.getObrasocial().getNombreObraSocial());
            reservasDtoMedico.add(rdto);
        }
        return  reservasDtoMedico;
    }
}
