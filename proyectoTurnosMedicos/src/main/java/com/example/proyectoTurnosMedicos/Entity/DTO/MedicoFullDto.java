package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class MedicoFullDto {
    private Long id;
    @NotNull(message = "campo dni no puede ser nulo")
    private String dni;
    @NotNull(message = "campo matricula no puede ser nulo")
    private String matricula;
    @NotNull(message = "campo nombre no puede ser nulo")
    private String nombre;
    @NotNull(message = "campo apellido no puede ser nulo")
    private String apellido;
    @NotNull(message = "campo direccion no puede ser nulo")
    private String direccion;
    @NotNull(message = "campo email no puede ser nulo")
    private String email;
    @NotNull(message = "campo especialidad/es no puede ser nulo")
    private List<Long> idEspecialidades;
    @NotNull(message = "campo obras sociales no puede ser nulo")
    private List<Long> idObrasSociales;
    @NotNull(message = "campo usuario_id no puede ser nulo")
    private Long idUsuario;
}
