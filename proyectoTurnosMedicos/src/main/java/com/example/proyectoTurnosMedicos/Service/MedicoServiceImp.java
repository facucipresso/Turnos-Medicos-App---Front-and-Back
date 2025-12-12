package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.MedicoDto;
import com.example.proyectoTurnosMedicos.Entity.Especialidad;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;
import com.example.proyectoTurnosMedicos.Entity.Usuario;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.*;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.Hibernate;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Slf4j
@Service
public class MedicoServiceImp implements MedicoService{

    // quiero que un medico se agregue una obra social
    @Autowired
    MedicoRepository medicoRepository;

    @Autowired
    PacienteRepository pacienteRepository;

    @Autowired
    ObraSocialRepository obraSocialRepository;

    @Autowired
    EspecialidadRepository especialidadRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    private boolean isNullOrBlank(String str){
        return str == null || str.trim().isEmpty();
    }

    @Override
    public MedicoDto createMedico(MedicoDto medicoDto) {
        if (isNullOrBlank(medicoDto.getNombre()) || isNullOrBlank(medicoDto.getApellido()) || isNullOrBlank(medicoDto.getDireccion()) || medicoDto.getIdEspecialidades() == null) {
            throw new BadRequestException("Campos incompletos");
        }

        //esta lista y el foreach lo hice por que ahora puede tener varias especialidades
        List<Especialidad> especialidades = new ArrayList<Especialidad>();

        for(Long idEspec : medicoDto.getIdEspecialidades()){
            Especialidad esp = especialidadRepository.findById(idEspec).
                    orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
            especialidades.add(esp);
        }

        //esto lo saque estaba antes cuando tenia una sola especialidad el medico
        /*Especialidad espe = especialidadRepository.findById(medicoDto.getIdEspecialidad()).
                orElseThrow(() -> new BadRequestException("Especialidad no encontrada"));*/

        Usuario usuario = usuarioRepository.findById(medicoDto.getIdUsuario()).
                orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        /*ESTO LO TENGO QUE HACER EN USUARIO
        if(medicoRepository.findMedicoByEmail(medicoDto.getEmail()).isPresent() || pacienteRepository.findPacienteByEmail(medicoDto.getEmail()).isPresent()){
            throw new BadRequestException("Ya existe un usuario con ese Email");
        }*/
        Medico medico = new Medico();
        medico.setDni(medicoDto.getDni());
        medico.setMatricula(medicoDto.getMatricula());
        medico.setNombre(medicoDto.getNombre());
        medico.setApellido(medicoDto.getApellido());
        medico.setDireccion(medicoDto.getDireccion());
        //medico.setEmail(medicoDto.getEmail());
        medico.setEspecialidades(especialidades);
        medico.setUsuario(usuario);

        Medico med = medicoRepository.save(medico);
        medicoDto.setId(med.getId());
        medicoDto.setDni(med.getDni());
        medicoDto.setNombre(med.getNombre());
        medicoDto.setApellido(med.getApellido());
        medicoDto.setDireccion(med.getDireccion());
        //medicoDto.setEmail(med.getEmail());
        medicoDto.setIdEspecialidades(medicoDto.getIdEspecialidades());
        medicoDto.setIdUsuario(med.getUsuario().getId());

        return medicoDto;
    }

    @Override
    public List<MedicoDto> findAllMedicos() {
        List<Medico> medicos = medicoRepository.findAll();
        List<MedicoDto> medicosDtos = new ArrayList<>();
        for(Medico m : medicos){
            List<Long> idEspecialidades = new ArrayList<Long>();
            for(Especialidad esp : m.getEspecialidades()){
                especialidadRepository.findById(esp.getId()).
                        orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
                idEspecialidades.add(esp.getId());
            }
            MedicoDto medicoDto = new MedicoDto();
            medicoDto.setId(m.getId());
            medicoDto.setDni(m.getDni());
            medicoDto.setMatricula(m.getMatricula());
            medicoDto.setNombre(m.getNombre());
            medicoDto.setApellido(m.getApellido());
            medicoDto.setDireccion(m.getDireccion());
            //medicoDto.setEmail(m.getEmail());
            medicoDto.setIdEspecialidades(idEspecialidades);
            medicoDto.setIdUsuario(m.getUsuario().getId());
            medicosDtos.add(medicoDto);
        }
        return medicosDtos;
    }

    @Override
    public MedicoDto updateMedico(Long id_medico, MedicoDto medicoDto) {
        if(isNullOrBlank(medicoDto.getNombre()) || isNullOrBlank(medicoDto.getApellido()) || isNullOrBlank(medicoDto.getDireccion()) || medicoDto.getIdEspecialidades() == null){
            throw new BadRequestException("Campos incompletos");
        }
        Medico med0 = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("Medico no encotrado"));

        /*Especialidad especialidad = especialidadRepository.findById(medicoDto.getIdEspecialidad()).
                orElseThrow(()-> new ResourceNotFoundException("Especialidad no encontrada"));*/

        List<Especialidad> especialidadess = new ArrayList<Especialidad>();

        for(Long idEspe : medicoDto.getIdEspecialidades()){
            Especialidad especialidad = especialidadRepository.findById(idEspe).
                    orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
            especialidadess.add(especialidad);
        }
        Usuario usuario = usuarioRepository.findById(medicoDto.getIdUsuario()).
                orElseThrow(()-> new ResourceNotFoundException("Usuario no encontrado"));

        med0.setDni(medicoDto.getDni());
        med0.setNombre(medicoDto.getNombre());
        med0.setApellido(medicoDto.getApellido());
        med0.setDireccion(medicoDto.getDireccion());
        //med0.setEmail(medicoDto.getEmail());
        med0.setEspecialidades(especialidadess);
        med0.setUsuario(usuario);

        Medico medico1 = medicoRepository.save(med0);
        MedicoDto mdto = new MedicoDto();
        mdto.setId(medico1.getId());
        mdto.setDni(medico1.getDni());
        mdto.setNombre(medico1.getNombre());
        mdto.setApellido(medico1.getApellido());
        mdto.setDireccion(medico1.getDireccion());
        //mdto.setEmail(medico1.getEmail());
        mdto.setIdEspecialidades(mdto.getIdEspecialidades());
        mdto.setIdUsuario(medico1.getUsuario().getId());

        return mdto;
    }

    @Override
    public Medico findMedicoById(Long id_medico) {
        Medico medico = medicoRepository.findById(id_medico).
                orElseThrow(()->new ResourceNotFoundException("Medico no encontrado, ID incorrecto"));
        /*MedicoDto medicoDto = new MedicoDto();
        medicoDto.setId(medico.getId());
        medicoDto.setNombre(medico.getNombre());
        medicoDto.setApellido(medico.getApellido());
        medicoDto.setDireccion(medico.getDireccion());
        medicoDto.setEmail(medico.getEmail());
        medicoDto.setIdEspecialidad(medico.getEspecialidad().getId());*/
        return medico;
    }

    @Override
    public void deleteMedicoById(Long id_medico) {
        if(medicoRepository.findById(id_medico).isEmpty()){
            throw new ResourceNotFoundException("Medico no encontrado");
        }
        medicoRepository.deleteById(id_medico);
    }

    @Override
    @Transactional
    public Medico deleteObraSocial(Long id_medico, Long id_obraSocial) {
        if(medicoRepository.findById(id_medico).isEmpty() || obraSocialRepository.findById(id_obraSocial).isEmpty()){
            throw new ResourceNotFoundException("Medico u obra social requeridos no existen");
        }
        Medico medico = medicoRepository.findById(id_medico).get();
        ObraSocial obraSocial = obraSocialRepository.findById(id_obraSocial).get();

        medico.getObrasSociales().remove(obraSocial);
        return medicoRepository.save(medico);
    }

    @Override
    public List<MedicoDto> findMedicoByEspecialidad(Long idEspecialidad) {
        Especialidad especialidad = especialidadRepository.findById(idEspecialidad)
                .orElseThrow(() -> new ResourceNotFoundException("Especialidad no encontrada"));

        List<Medico> medicos = medicoRepository.findByEspecialidadesContaining(especialidad);
        List<MedicoDto> medicosDtos = new ArrayList<>();

        for (Medico m : medicos) {
            List<Long> idEspecialidades = new ArrayList<Long>();
            for(Especialidad esp : m.getEspecialidades()){
                especialidadRepository.findById(esp.getId()).
                        orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
                idEspecialidades.add(esp.getId());
            }
            MedicoDto medicoDto = new MedicoDto();
            medicoDto.setId(m.getId());
            medicoDto.setDni(m.getDni());
            medicoDto.setNombre(m.getNombre());
            medicoDto.setApellido(m.getApellido());
            medicoDto.setDireccion(m.getDireccion());
            //medicoDto.setEmail(m.getEmail());
            medicoDto.setIdEspecialidades(idEspecialidades);
            medicoDto.setIdUsuario(m.getUsuario().getId());
            medicosDtos.add(medicoDto);
        }

        return medicosDtos;
    }

    @Override
    public List<MedicoDto> getMedicosByObraSocial(Long id_obraSocial){
        List<Medico> medicosfiltrados = medicoRepository.findByObrasSociales_Id(id_obraSocial);
        List<MedicoDto> medicosFiltradosDto = new ArrayList<>();
        for(Medico med: medicosfiltrados){
            List<Long> idEspecialidades = new ArrayList<Long>();
            for(Especialidad esp : med.getEspecialidades()){
                especialidadRepository.findById(esp.getId()).
                        orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
                idEspecialidades.add(esp.getId());
            }
            MedicoDto mdto = new MedicoDto();
            mdto.setId(med.getId());
            mdto.setDni(med.getDni());
            mdto.setNombre(med.getNombre());
            mdto.setApellido(med.getApellido());
            mdto.setDireccion(med.getDireccion());
            //mdto.setEmail(med.getEmail());
            mdto.setIdEspecialidades(idEspecialidades);
            mdto.setIdUsuario(med.getUsuario().getId());
            medicosFiltradosDto.add(mdto);
        }
        return medicosFiltradosDto;
    }

    @Override
    public MedicoDto obtenerMedicoPorTurno(Long idTurno){
        Medico med = medicoRepository.findByIdTurno(idTurno)
                .orElseThrow(() -> new ResourceNotFoundException("Especialidad no encontrada"));
        MedicoDto medicoDto = new MedicoDto();
        List<Long> idEspecialidades = new ArrayList<Long>();
        for(Especialidad esp : med.getEspecialidades()){
            especialidadRepository.findById(esp.getId()).
                    orElseThrow(() -> new BadRequestException("Una de las especialidades no fue encontrada"));
            idEspecialidades.add(esp.getId());
        }
        medicoDto.setId(med.getId());
        medicoDto.setDni(med.getDni());
        medicoDto.setNombre(med.getNombre());
        medicoDto.setApellido(med.getApellido());
        medicoDto.setDireccion(med.getDireccion());
        //medicoDto.setEmail(med.getEmail());
        medicoDto.setIdEspecialidades(idEspecialidades);
        medicoDto.setIdUsuario(med.getUsuario().getId());
        return medicoDto;
    }


    @Override
    @Transactional
    public Medico agregarObraSocial(Long medico_id, Long obraSocial_id){

        Medico medico = medicoRepository.findById(medico_id).
                orElseThrow(()-> new ResourceNotFoundException("ID de medico inexistente"));
        ObraSocial obraSocial = obraSocialRepository.findById(obraSocial_id).
                orElseThrow(()-> new ResourceNotFoundException("ID de obra social inexistente"));

        medico.getObrasSociales().add(obraSocial);

        return medicoRepository.save(medico);
    }




}
