package com.example.proyectoTurnosMedicos.Entity.DTO;

import com.example.proyectoTurnosMedicos.Entity.Rol;
import lombok.Data;

@Data
public class UsuarioResponseDto {
    private Long id;
    private String email;
    private Rol rol;
}
