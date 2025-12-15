package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.*;
import com.example.proyectoTurnosMedicos.Entity.DTO.PacienteDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestCancelDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestDto;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

    @Autowired
    MedicoRepository medicoRepository;


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

        // validar que el paciente no tenga un turno reservado ya con ese dia y esa hora
        List<ReservaDto> reservasDelPaciente = this.getReservasPaciente(reservaRDto.getIdPaciente());
        for (ReservaDto res : reservasDelPaciente){
            if(res.getFechaReserva().equals(t.getDiaTurno()) && res.getHoraReserva().equals(t.getHoraTurno()) ){
                throw new BadRequestException("PACIENTE_TURNO_SOLAPADO");
            }
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

    @Override
    public ReservaDto getReservaEspecifica(ReservaRequestCancelDto res) {
        DateTimeFormatter formateadorFecha = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formateadorHora = DateTimeFormatter.ofPattern("HH:mm");

        LocalDate fechaFormateada = LocalDate.parse(res.getFechaTurno(), formateadorFecha);
        LocalTime horaFormateada = LocalTime.parse(res.getHoraTurno(), formateadorHora);

        Paciente pac = new Paciente();

        Medico med = medicoRepository.findByNombreAndApellido(res.getNombreMedico(), res.getApellidoMedico())
                .orElseThrow(()->new ResourceNotFoundException("Medico no encontrado"));

        if(res.getApellidoPaciente() == null && res.getNombrePaciente() == null){
            pac = pacienteRepository.findByDni(res.getDni())
                    .orElseThrow(()-> new ResourceNotFoundException("Paciente no encontrado"));
        }

        if(res.getDni() == null){
            pac = pacienteRepository.findByNombreAndApellido(res.getNombrePaciente(), res.getApellidoPaciente())
                    .orElseThrow(()->new ResourceNotFoundException("Paciente no encontrado"));
        }


        List<Reserva> reservasDelPaciente = reservaRepository.getReservasByPaciente_Id(pac.getId());
        Reserva resEncontrada = reservasDelPaciente.stream().filter(r -> r.getTurno().getMedico().equals(med) &&
                r.getTurno().getHoraTurno().equals(horaFormateada) &&
                r.getTurno().getDiaTurno().equals(fechaFormateada))
                .findFirst()
                .orElseThrow(()-> new ResourceNotFoundException("PACIENTE_NO_RESERVA_FECHA_MEDICO"));

        ReservaDto respuesta = new ReservaDto();
        respuesta.setId(resEncontrada.getId());
        respuesta.setFechaReserva(resEncontrada.getTurno().getDiaTurno());
        respuesta.setHoraReserva(resEncontrada.getTurno().getHoraTurno());
        respuesta.setNombrePaciente(pac.getNombre());
        respuesta.setApellidoPaciente(pac.getApellido());
        respuesta.setApellidoMedico(resEncontrada.getTurno().getMedico().getApellido());
        respuesta.setNombreObraSocial(resEncontrada.getObrasocial().getNombreObraSocial());

        return respuesta;
    }
}
