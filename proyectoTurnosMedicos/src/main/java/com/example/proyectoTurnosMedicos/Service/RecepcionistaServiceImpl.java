package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.RecepcionistaDto;
import com.example.proyectoTurnosMedicos.Entity.Recepcionista;
import com.example.proyectoTurnosMedicos.Entity.Usuario;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Repository.RecepcionistaRepository;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import com.example.proyectoTurnosMedicos.Service.RecepcionistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecepcionistaServiceImpl implements RecepcionistaService {

    @Autowired
    RecepcionistaRepository recepcionistaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public RecepcionistaDto create(RecepcionistaDto dto) {
        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> new BadRequestException("Usuario no encontrado"));

        Recepcionista r = new Recepcionista();
        r.setNombre(dto.getNombre());
        r.setApellido(dto.getApellido());
        r.setDireccion(dto.getDireccion());
        r.setUsuario(usuario); //aca me da error no se porque en setUsuario SOLUCIONADO

        Recepcionista saved = recepcionistaRepository.save(r);

        dto.setId(saved.getId()); // aca tambien me da error en el .getId, SOLUCIONADO
        return dto;
    }
}