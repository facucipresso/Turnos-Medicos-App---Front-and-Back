package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AdministradorDto {
    private Long id;
    @NotNull(message = "campo nombre no puede ser nulo")
    private String nombre;
    @NotNull(message = "campo apellido no puede ser nulo")
    private String apellido;
    @NotNull(message = "campo direccion no puede ser nulo")
    private String direccion;
    @NotNull(message = "campo usuario_id no puede ser nulo")
    private Long idUsuario;
}
