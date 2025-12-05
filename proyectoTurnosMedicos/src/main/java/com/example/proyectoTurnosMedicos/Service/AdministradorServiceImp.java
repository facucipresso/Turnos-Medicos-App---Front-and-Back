package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.Administrador;
import com.example.proyectoTurnosMedicos.Entity.DTO.AdministradorDto;
import com.example.proyectoTurnosMedicos.Entity.Usuario;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Repository.AdministradorRepository;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministradorServiceImp implements AdministradorService{

    @Autowired
    AdministradorRepository administradorRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public AdministradorDto createAdmin(AdministradorDto administradorDto) {
        Usuario usuario = usuarioRepository.findById(administradorDto.getIdUsuario()).
                orElseThrow(()-> new BadRequestException("Usuario no encontrado"));

        Administrador administrador = new Administrador();
        administrador.setNombre(administradorDto.getNombre());
        administrador.setApellido(administradorDto.getApellido());
        administrador.setDireccion(administradorDto.getDireccion());
        administrador.setUsuario(usuario);

        Administrador admin = administradorRepository.save(administrador);
        administradorDto.setId(admin.getId());
        administradorDto.setNombre(admin.getNombre());
        administradorDto.setApellido(admin.getApellido());
        administradorDto.setDireccion(admin.getDireccion());
        administradorDto.setIdUsuario(admin.getUsuario().getId());

        return administradorDto;
    }
}
