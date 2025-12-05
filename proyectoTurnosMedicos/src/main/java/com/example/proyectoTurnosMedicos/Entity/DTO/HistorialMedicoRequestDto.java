package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HistorialMedicoRequestDto {
    private Long id;
    private LocalDate fechaDto;
    private String nombreMedicoDto;
    private String nombrePacienteDto;
    private String nombreObraSocialDto;
    private String medicacionActualDto;
    private String motivoDto;
    private String descripcionDto;
    private String tratamientoDto;
    private float costoDto;
}
