package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PacienteDto {
    private Long id;
    @NotNull(message = "campo nombre no puede ser nulo")
    private String nombre;
    @NotNull(message = "campo apellido no puede ser nulo")
    private String Apellido;
    @NotNull(message = "campo direccion no puede ser nulo")
    private String direccion;
    /*ESTE VA SOLO EN LA ENTIDAD USUARIO
    @NotNull(message = "campo email no puede ser nulo")
    private String email;*/
    @NotNull(message = "campo usuario_id no puede ser nulo")
    private Long idUsuario;
}
