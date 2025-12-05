package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.Especialidad;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadServiceImp implements EspecialidadService{

    @Autowired
    EspecialidadRepository especialidadRepository;

    private boolean isNullOrBlank(String str){
        return str == null || str.trim().isEmpty();
    }


    public Especialidad createEspecialidad(Especialidad especialidad) {
        List<Especialidad> especialidadesCargadas = especialidadRepository.findAll();
        for(Especialidad esp : especialidadesCargadas){
            if(esp.getNombre().equals(especialidad.getNombre())){
                throw new BadRequestException("Especialidad ya cargada");
            }
        }
        Especialidad espe = new Especialidad();
        espe.setNombre(especialidad.getNombre());

        return especialidadRepository.save(espe);
    }

    public Especialidad updateEspecialidad(Long id, Especialidad especialidadActualizada) {
        Especialidad especialidad = especialidadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
        if(isNullOrBlank(especialidadActualizada.getNombre())){
            throw new BadRequestException("Campo incompleto");
        }
        especialidad.setNombre(especialidadActualizada.getNombre());
        return especialidadRepository.save(especialidad);
    }

    public void deleteEspecialidad(Long id) {
        especialidadRepository.deleteById(id);
    }

    public List<Especialidad> getAllEspecialidades() {
        return especialidadRepository.findAll();
    }

    public Optional<Especialidad> getEspecialidadById(Long id) {
        return especialidadRepository.findById(id);
    }
}

