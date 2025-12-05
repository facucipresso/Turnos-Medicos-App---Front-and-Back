package com.example.proyectoTurnosMedicos.Service;


import com.example.proyectoTurnosMedicos.Entity.Especialidad;

import java.util.List;
import java.util.Optional;

//aca declaro las funciones, no las implemento
public interface EspecialidadService {

    Especialidad createEspecialidad(Especialidad especialidad);
    Especialidad updateEspecialidad(Long id, Especialidad especialidadActualizada);
    void deleteEspecialidad(Long id);
    List<Especialidad> getAllEspecialidades();
    Optional<Especialidad> getEspecialidadById(Long id);

}
