package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TurnoDTO {
    private String nombreMedico;
    private String apellidoMedico;
    private LocalDate diaTurno; // 2025-04-10
    private LocalTime horaTurno; // 15:30
    private boolean reservado;
}
