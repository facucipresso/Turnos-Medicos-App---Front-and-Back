package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;
import lombok.NonNull;
import lombok.extern.java.Log;

import javax.validation.constraints.NotNull;

@Data
public class ReservaRequestDto {

    @NotNull(message = "Es obligatorio el campo id del turno")
    private Long idTurno;
    @NotNull(message = "Es obligatorio el campo id del paciente")
    private Long idPaciente;

    //@NotNull(message = "Es obligatorio el campo id del obra social")
    private Long idObraSocial;
}
