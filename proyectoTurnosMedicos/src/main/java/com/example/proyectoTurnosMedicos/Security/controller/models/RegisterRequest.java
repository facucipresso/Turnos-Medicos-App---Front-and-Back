package com.example.proyectoTurnosMedicos.Security.controller.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}

//----------------------- ESTA CLASE LA ESTARIA DEJANDO DE USAR -----------------------------------