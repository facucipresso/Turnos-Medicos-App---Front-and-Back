package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.TurnoDTO;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.Turno;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.MedicoRepository;
import com.example.proyectoTurnosMedicos.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TurnoServiceImp implements TurnoService{

    @Autowired
    TurnoRepository turnoRepository;

    @Autowired
    MedicoRepository medicoRepository;

    @Transactional
    @Override
    public TurnoDTO createTurno(Long id_medico, TurnoDTO turnoDTO) {
        Medico med = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("Medico no encontrado"));
        List<Turno> turnosLanzados = turnoRepository.findAll();
        for(Turno turno : turnosLanzados){
            if(turno.getMedico().equals(med) && turno.getDiaTurno().equals(turnoDTO.getDiaTurno()) && turno.getHoraTurno().equals(turnoDTO.getHoraTurno())){
                throw new BadRequestException("Turno repetido, dia y hora ya asignada anteriormente");
            }
        }
        Turno t = new Turno();
        t.setDiaTurno(turnoDTO.getDiaTurno());
        t.setHoraTurno(turnoDTO.getHoraTurno());
        t.setReservado(turnoDTO.isReservado());
        t.setMedico(med);
        if(!med.getTurnos().contains(t)){
            med.getTurnos().add(t);
        }

        Turno tur = turnoRepository.save(t);
        TurnoDTO tdto = new TurnoDTO();
        tdto.setNombreMedico(tur.getMedico().getNombre());
        tdto.setApellidoMedico(tur.getMedico().getApellido());
        tdto.setDiaTurno(tur.getDiaTurno());
        tdto.setHoraTurno(tur.getHoraTurno());
        tdto.setReservado(tur.isReservado());

        return tdto;
    }

    @Override
    public TurnoDTO updateTurno(Long id_medico, Long id_turno, TurnoDTO turnoDTO) {
        Medico m = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("Medico no encontrado"));

        Turno t = turnoRepository.findById(id_turno).
                orElseThrow(()->new ResourceNotFoundException("Turno no encontrado"));
        if(!t.getMedico().equals(m)){
            throw new BadRequestException("Medico no asociado a ese turno");
        }
        t.setDiaTurno(turnoDTO.getDiaTurno());
        t.setHoraTurno(turnoDTO.getHoraTurno());
        t.setReservado(turnoDTO.isReservado());
        t.setMedico(m);
        Turno tur = turnoRepository.save(t);
        turnoDTO.setNombreMedico(tur.getMedico().getNombre());
        turnoDTO.setApellidoMedico(tur.getMedico().getApellido());
        turnoDTO.setDiaTurno(tur.getDiaTurno());
        turnoDTO.setHoraTurno(tur.getHoraTurno());
        turnoDTO.setReservado(tur.isReservado());

        return turnoDTO;
    }

    @Override
    public void deleteTurno(Long id_medico, Long id_turno) {

        Medico m = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("ID medico no encontrado"));
        Turno t = turnoRepository.findById(id_turno).
                orElseThrow(()->new ResourceNotFoundException("Turno no encontrado"));

        if(!t.getMedico().equals(m)){
            throw new BadRequestException("No se puede eliminar turnos de otros medicos");
        }

        m.getTurnos().remove(t);
        turnoRepository.delete(t);

    }

    @Override
    public List<Turno> findTurnosByMedico(Long id_medico) {
        Medico m = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("Medico no encontrado"));
        return m.getTurnos();
    }

    @Override
    public Turno findTurnoById(Long id_turno){
        Turno t = turnoRepository.findById(id_turno).
                orElseThrow(()-> new ResourceNotFoundException("Turno no encontrado"));
        return t;
    }

    @Override
    public boolean reservarTurno(Long id_turno){
        Turno t = turnoRepository.findById(id_turno).
                orElseThrow(()-> new ResourceNotFoundException("Turno no encontrado"));
        Turno ta = new Turno();
        ta.setId(t.getId());
        ta.setDiaTurno(t.getDiaTurno());
        ta.setHoraTurno(t.getHoraTurno());
        ta.setMedico(t.getMedico());
        ta.setReservado(true);
        turnoRepository.save(ta);
        return true;
    }

    @Override
    public List<Turno> findTurnosReservados(Long id_medico){
        List<Turno> turnosDeMedico = turnoRepository.findAll();
        List<Turno> turnosReservados = new ArrayList<>();
        for(Turno turno : turnosDeMedico){
            if(turno.isReservado()){
                turnosReservados.add(turno);
            }
        }
        return turnosReservados;
    }
}
