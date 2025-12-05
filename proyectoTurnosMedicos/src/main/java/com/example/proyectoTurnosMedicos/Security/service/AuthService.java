package com.example.proyectoTurnosMedicos.Security.service;

import com.example.proyectoTurnosMedicos.Security.controller.models.AuthResponse;
import com.example.proyectoTurnosMedicos.Security.controller.models.AuthenticationRequest;
import com.example.proyectoTurnosMedicos.Security.controller.models.RegisterRequest;

public interface AuthService {
    AuthResponse registerPaciente(AuthenticationRequest request);
    AuthResponse registerMedico(AuthenticationRequest request);
    AuthResponse registerAdmin(AuthenticationRequest request);
    AuthResponse authenticate(AuthenticationRequest request);
}
