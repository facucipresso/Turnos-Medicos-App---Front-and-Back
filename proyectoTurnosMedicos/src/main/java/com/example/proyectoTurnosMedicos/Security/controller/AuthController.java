package com.example.proyectoTurnosMedicos.Security.controller;


import com.example.proyectoTurnosMedicos.Security.controller.models.AuthResponse;
import com.example.proyectoTurnosMedicos.Security.controller.models.AuthenticationRequest;
import com.example.proyectoTurnosMedicos.Security.controller.models.RegisterRequest;
import com.example.proyectoTurnosMedicos.Security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;

    //registra paciente ACCESIBLE DESDE EL FRONT
    @PostMapping("/register/paciente")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.registerPaciente(request));
    }

    //registra medico ACCESIBLE DESDE EL FRONT
    @PostMapping("/register/medico")
    public ResponseEntity<AuthResponse> registerMedico(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.registerMedico(request));
    }

    //registra admin NO ACCESIBLE DESDE EL FRONTACCESIBLE DESDE EL FRONT
    @PostMapping("/register/admin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.registerAdmin(request));
    }

    //ACCESIBLE DESDE EL FRONT
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/register/recepcionista")
    public ResponseEntity<AuthResponse> registerRecepcionista(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.registerRecepcionista(request));
    }

}
