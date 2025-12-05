package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.*;
import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioRequestDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.UsuarioResponseDto;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.AdministradorRepository;
import com.example.proyectoTurnosMedicos.Repository.MedicoRepository;
import com.example.proyectoTurnosMedicos.Repository.PacienteRepository;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    PacienteRepository pacienteRepository;

    @Autowired
    MedicoRepository medicoRepository;

    @Autowired
    AdministradorRepository administradorRepository;

    //NO VA MAS, ESTA EN EL AUTH CONTROLLER
    /*@Override
    public UsuarioResponseDto crearUsuarioPac(UsuarioRequestDto usuarioRequestDto) {

        if(usuarioRepository.findUserByEmail(usuarioRequestDto.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioRequestDto.getEmail());
        usuario.setPassword(usuarioRequestDto.getPassword());
        usuario.setRol(Rol.PACIENTE);

        usuario = usuarioRepository.save(usuario);
        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.setId(usuario.getId());
        usuarioResponseDto.setEmail(usuario.getEmail());
        usuarioResponseDto.setRol(usuario.getRol());

        return usuarioResponseDto;
    }*/

    //NO VA MAS, ESTA EN EL AUTH CONTROLLER
    /*@Override
    public UsuarioResponseDto crearUsuarioMed(UsuarioRequestDto usuarioRequestDto) {
        if(usuarioRepository.findUserByEmail(usuarioRequestDto.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioRequestDto.getEmail());
        usuario.setPassword(usuarioRequestDto.getPassword());
        usuario.setRol(Rol.MEDICO);

        usuario = usuarioRepository.save(usuario);
        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.setId(usuario.getId());
        usuarioResponseDto.setEmail(usuario.getEmail());
        usuarioResponseDto.setRol(usuario.getRol());

        return usuarioResponseDto;
    }*/

    //NO VA MAS, ESTA EN EL AUTH CONTROLLER
    /*@Override
    public UsuarioResponseDto crearUsuarioAdmin(UsuarioRequestDto usuarioRequestDto) {
        if(usuarioRepository.findUserByEmail(usuarioRequestDto.getEmail()).isPresent()){
            throw new BadRequestException("Email ya ingresado, no se lo puede registrar");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioRequestDto.getEmail());
        usuario.setPassword(usuarioRequestDto.getPassword());
        usuario.setRol(Rol.ADMIN);

        usuario = usuarioRepository.save(usuario);
        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.setId(usuario.getId());
        usuarioResponseDto.setEmail(usuario.getEmail());
        usuarioResponseDto.setRol(usuario.getRol());

        return usuarioResponseDto;
    }*/

    //NO ESTA LLAMADA EN NINGUN LADO
    /*@Override
    public UsuarioResponseDto getUsuarioById(Long id_usuario) {
        Usuario usuario = usuarioRepository.findById(id_usuario).
                orElseThrow(()-> new BadRequestException("Usuario inexistente"));

        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.setId(usuario.getId());
        usuarioResponseDto.setEmail(usuario.getEmail());
        usuarioResponseDto.setRol(usuario.getRol());

        return usuarioResponseDto;
    }*/

    //NO VA MAS, ESTA EN EL AUTH CONTROLLER
    /*@Override
    public UsuarioResponseDto usuarioLogin(UsuarioRequestDto usuarioRequestDto) {
        Usuario usuario = usuarioRepository.findUserByEmail(usuarioRequestDto.getEmail()).
                orElseThrow(()-> new ResourceNotFoundException("Email no encontrado"));
        if(!usuarioRequestDto.getPassword().equals(usuario.getPassword())){
            throw new BadRequestException("Contraseña Inconrrecta");
        }
        UsuarioResponseDto usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.setId(usuario.getId());
        usuarioResponseDto.setEmail(usuario.getEmail());
        usuarioResponseDto.setRol(usuario.getRol());

        return usuarioResponseDto;
    }*/

    //ESTA ES LA UNICA QUE PUEDE QUEDAR ACA
    @Override
    public Long getIdByUsuarioId(Long id_usuario) {
        if(usuarioRepository.findById(id_usuario).isEmpty()){
            throw new BadRequestException("Id de usuario incorrecto");
        }
        if(pacienteRepository.findByUsuario_Id(id_usuario).isPresent()){
            Paciente paciente = pacienteRepository.findByUsuario_Id(id_usuario).orElseThrow(()-> new ResourceNotFoundException("Paciente no encontrado"));
            return paciente.getId();
        }else if(medicoRepository.findByUsuario_Id(id_usuario).isPresent()){
            Medico medico = medicoRepository.findByUsuario_Id(id_usuario).orElseThrow(()-> new ResourceNotFoundException("Medico no encotrado"));
            return medico.getId();
        }else if(administradorRepository.findByUsuario_Id(id_usuario).isPresent()){
            Administrador admin = administradorRepository.findByUsuario_Id(id_usuario).orElseThrow(()-> new ResourceNotFoundException("Administrador no encontrado"));
            return admin.getId();
        }else{
            throw new BadRequestException("No se encuentra nada");
        }
    }
}
