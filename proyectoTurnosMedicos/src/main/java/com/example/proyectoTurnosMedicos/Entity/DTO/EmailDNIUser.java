package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
public class EmailDNIUser {
    @NotNull(message = "campo email no puede ser nulo")
    private String email;
    @NotNull(message = "campo DNI no puede ser nulo")
    private String dni;
}
