package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestCancelDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.ReservaRequestDto;
import com.example.proyectoTurnosMedicos.Entity.Reserva;

import java.util.List;

public interface ReservaService {

    ReservaDto createReserva(ReservaRequestDto reserva);
    void deleteReserva(Long id_reserva);
    List<ReservaDto> getReservasPaciente(Long idPaciente);
    List<ReservaDto> getReservasMedico(Long id_medico);

    ReservaDto getReservaEspecifica(ReservaRequestCancelDto res);
}
