package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class MedicoDto {
    private Long id;
    @NotNull(message = "campo nombre no puede ser nulo")
    private String nombre;
    @NotNull(message = "campo apellido no puede ser nulo")
    private String Apellido;
    @NotNull(message = "campo direccion no puede ser nulo")
    private String direccion;
    /*ESTE ATRIBUTO TAMBIEN SE VA, SOLO ES DE USUARIO
    @NotNull(message = "campo email no puede ser nulo")
    private String email;*/
    @NotNull(message = "campo especialidad no puede ser nulo")
    private Long idEspecialidad;
    @NotNull(message = "campo usuario_id no puede ser nulo")
    private Long idUsuario;
}
