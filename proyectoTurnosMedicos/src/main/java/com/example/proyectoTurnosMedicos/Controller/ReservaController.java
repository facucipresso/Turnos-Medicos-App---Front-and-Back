package com.example.proyectoTurnosMedicos.Controller;


import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestDto;
import com.example.proyectoTurnosMedicos.Entity.Reserva;
import com.example.proyectoTurnosMedicos.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservaController {

    @Autowired
    ReservaService reservaService;

    // el paciente hace una reserva, el medico tambien podria
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE', 'RECEPCIONISTA')")
    @PostMapping("/pacientes/turnos/create-reserva")
    public ReservaDto createReserva(@RequestBody ReservaRequestDto rrdto){
        return reservaService.createReserva(rrdto);
    }

    // el paciente puede cancelar una reserva, pero medico y admin tambien
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @DeleteMapping("/pacientes/turnos/delete-reserva/{id_reserva}")
    public void deleteReserva(@PathVariable Long id_reserva){
        reservaService.deleteReserva(id_reserva);
    }

    //listar todas las reservas de turnos del medico
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    @GetMapping("/medico/{id_medico}/get-reservas")
    public List<ReservaDto> reservasMedico(@PathVariable Long id_medico){
        return reservaService.getReservasMedico(id_medico);
    }

    //listar todas las reservas de turnos de un paciente
    @PreAuthorize("hasAnyRole('PACIENTE')")
    @GetMapping("/paciente/{id_paciente}/get-reservas")
    public List<ReservaDto> reservasPaciente(@PathVariable Long id_paciente){
        return reservaService.getReservasPaciente(id_paciente);
    }

}
