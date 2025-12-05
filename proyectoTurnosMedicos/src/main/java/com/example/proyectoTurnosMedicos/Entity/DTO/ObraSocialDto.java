package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ObraSocialDto {
    @NotBlank(message = "campo nombre de obra social obligatorio")
    private String nombreObraSocial;
    @NotBlank(message = "campo plan de obra social obligatorio")
    private String planObraSocial;
}
