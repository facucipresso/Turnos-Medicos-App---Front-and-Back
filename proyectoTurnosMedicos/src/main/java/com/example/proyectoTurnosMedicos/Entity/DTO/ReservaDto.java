package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservaDto {
    private Long id;
    private LocalDate fechaReserva;
    private LocalTime horaReserva;
    private String nombrePaciente;
    private String apellidoPaciente;
    private String apellidoMedico;
    private String especialidadMedico;
    private String nombreObraSocial;
}
