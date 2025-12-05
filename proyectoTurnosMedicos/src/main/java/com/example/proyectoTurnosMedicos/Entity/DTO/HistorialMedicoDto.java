package com.example.proyectoTurnosMedicos.Entity.DTO;

import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import lombok.Data;
import org.springframework.core.StandardReflectionParameterNameDiscoverer;

import java.time.LocalDate;

@Data
public class HistorialMedicoDto {
    private Long id;
    private LocalDate fechaDto;
    private Long obrasocialDto;
    private String medicacionActualDto;
    private String motivoDto;
    private String descripcionDto;
    private String tratamientoDto;
    private float costoDto;
}
