package com.example.proyectoTurnosMedicos.Controller;


import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioRequestDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioResponseDto;
import com.example.proyectoTurnosMedicos.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    //DEPRECADO
    //SOLO REGISTRA A LOS USUARIOS ESTE ENDPOINT
    /*@PostMapping("/auth/register/pacient")
    public UsuarioResponseDto registerUsuario(@RequestBody UsuarioRequestDto usuarioRequestDto){
        return usuarioService.crearUsuarioPac(usuarioRequestDto);
    }*/

    //DEPRECADO
    //SOLO REGISTRA A LOS MEDICOS ESTE ENDPOINT (no conecta con el front)
    /*@PostMapping("/auth/register/medico")
    public UsuarioResponseDto registerUsuarioMed(@RequestBody UsuarioRequestDto usuarioRequestDto){
        return usuarioService.crearUsuarioMed(usuarioRequestDto);
    }*/

    //DEPRECADO
    //SOLO REGISTRA A LOS ADMINISTRADORES ESTE ENDPOINT (no conecta con el front)
    /*@PostMapping("/auth/register/admin")
    public UsuarioResponseDto registerUsuarioAdmin(@RequestBody UsuarioRequestDto usuarioRequestDto){
        return usuarioService.crearUsuarioAdmin(usuarioRequestDto);
    }*/

    //esta funcion no esta llamada desde ningun lado en el back
    /*@GetMapping("/usuarios/get-usuario/{id_usuario}")
    public UsuarioResponseDto getUsuario(@PathVariable Long id_usuario){
        return usuarioService.getUsuarioById(id_usuario);
    }*/

    //DEPRECADO (MANEJADO DESDE EL AUTH CONTROLLER)
    /*@PostMapping("/auth/login")
    public UsuarioResponseDto loginUsuario(@RequestBody UsuarioRequestDto usuarioRequestDto){
        return usuarioService.usuarioLogin(usuarioRequestDto);
    }*/

    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/usuario/get-id_rol/{id_usuario}")
    public Long getIdDeRolByIdUsuario(@PathVariable Long id_usuario){
        return usuarioService.getIdByUsuarioId(id_usuario);
    }

}
