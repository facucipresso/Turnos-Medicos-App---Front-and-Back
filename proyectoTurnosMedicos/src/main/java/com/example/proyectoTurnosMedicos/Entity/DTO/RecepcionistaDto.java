
package com.example.proyectoTurnosMedicos.Entity.DTO;

import lombok.Data;

@Data
public class RecepcionistaDto {
    private Long id;
    private String nombre;
    private String apellido;
    private String direccion;
    private Long idUsuario;
}

