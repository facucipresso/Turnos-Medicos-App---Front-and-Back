package com.example.proyectoTurnosMedicos.Security.controller.models;

import com.example.proyectoTurnosMedicos.Entity.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long idUsuario;
    private String email;
    private Rol rol;
}
