package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.EmailDNIUser;
import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioRequestDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioResponseDto;

public interface UsuarioService {
    //TODOS ESTOS SON IMPLEMENTADOS EN AUTH SERVICE, MENOS GETUSUARIOBYID QUE NO ES LLAMADA EN NINGUN LADO EN EL FRONT
    /*UsuarioResponseDto crearUsuarioPac(UsuarioRequestDto usuarioRequestDto);
    UsuarioResponseDto crearUsuarioMed(UsuarioRequestDto usuarioRequestDto);
    UsuarioResponseDto crearUsuarioAdmin(UsuarioRequestDto usuarioRequestDto);
    UsuarioResponseDto getUsuarioById(Long id_usuario);
    UsuarioResponseDto usuarioLogin(UsuarioRequestDto usuarioRequestDto);*/
    Long getIdByUsuarioId(Long id_usuario);

}
