package com.example.proyectoTurnosMedicos.Security.service;

import com.example.proyectoTurnosMedicos.Entity.Rol;
import com.example.proyectoTurnosMedicos.Entity.Usuario;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Security.controller.models.AuthResponse;
import com.example.proyectoTurnosMedicos.Security.controller.models.AuthenticationRequest;
import com.example.proyectoTurnosMedicos.Security.controller.models.RegisterRequest;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    //esto es para el registro de un paciente
    @Override
    public AuthResponse registerPaciente(AuthenticationRequest request) {
        if(usuarioRepository.findUserByEmail(request.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }

        //todo esto para generar un usuario y guardarlo
        var usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.PACIENTE)
                .build();
        usuarioRepository.save(usuario);

        //ahora tengo que generar un token que es lo que le tengo que devolver
        var jwtToken = jwtService.generateToken(usuario);

        return AuthResponse.builder()
                .token(jwtToken)
                .idUsuario((usuario.getId())) // aca no se si ya lo tengo al id
                .email(request.getEmail())
                .rol(Rol.PACIENTE).build();
    }

    //esto es para el registro de un paciente
    @Override
    public AuthResponse registerMedico(AuthenticationRequest request) {

        if(usuarioRepository.findUserByEmail(request.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }

        //todo esto para generar un usuario y guardarlo
        var usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.MEDICO)
                .build();
        usuarioRepository.save(usuario);

        //ahora tengo que generar un token que es lo que le tengo que devolver
        var jwtToken = jwtService.generateToken(usuario);

        return AuthResponse.builder()
                .token(jwtToken)
                .idUsuario((usuario.getId())) // aca no se si ya lo tengo al id
                .email(request.getEmail())
                .rol(Rol.MEDICO).build();
    }

    @Override
    public AuthResponse registerAdmin(AuthenticationRequest request) {

        if(usuarioRepository.findUserByEmail(request.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }

        //todo esto para generar un usuario y guardarlo
        var usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.ADMIN)
                .build();
        usuarioRepository.save(usuario);

        //ahora tengo que generar un token que es lo que le tengo que devolver
        var jwtToken = jwtService.generateToken(usuario);

        return AuthResponse.builder()
                .token(jwtToken)
                .idUsuario((usuario.getId())) // aca no se si ya lo tengo al id
                .email(request.getEmail())
                .rol(Rol.ADMIN).build();
    }

    @Override
    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = usuarioRepository.findUserByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .idUsuario((user.getId()))
                .email(user.getEmail())
                .rol(user.getRol()).build();
    }

    @Override
    public AuthResponse registerRecepcionista(AuthenticationRequest request) {
        if(usuarioRepository.findUserByEmail(request.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }

        var usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.RECEPCIONISTA)
                .build();

        usuarioRepository.save(usuario);

        var jwtToken = jwtService.generateToken(usuario);

        return AuthResponse.builder()
                .token(jwtToken)
                .idUsuario((usuario.getId()))
                .email(request.getEmail())
                .rol(Rol.RECEPCIONISTA).build();    }
}
