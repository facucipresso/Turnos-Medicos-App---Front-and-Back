package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservaRequestCancelDto {
    private String dni;
    private String nombrePaciente;
    private String apellidoPaciente;
    @NotNull(message = "Es obligatoria la fecha de la reserva")
    private String fechaTurno;
    @NotNull(message = "Es obligatoria la hora de la reserva")
    private String horaTurno;
    @NotNull(message = "Es obligatorio el campo nombre del medico")
    private String nombreMedico;
    @NotNull(message = "Es obligatorio el campo apellido del paciente")
    private String apellidoMedico;
}
