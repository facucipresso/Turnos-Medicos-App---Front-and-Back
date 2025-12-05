package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
public class UsuarioRequestDto {
    @NotNull(message = "campo email no puede ser nulo")
    private String email;
    @NotNull(message = "campo password no puede ser nulo")
    private String password;
}
