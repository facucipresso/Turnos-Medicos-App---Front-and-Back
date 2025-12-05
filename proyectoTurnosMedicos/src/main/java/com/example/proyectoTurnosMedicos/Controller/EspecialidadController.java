package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.Especialidad;
import com.example.proyectoTurnosMedicos.Service.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/especialidades")
public class EspecialidadController {

    @Autowired
    EspecialidadService especialidadService;

    //admin agrega especialidad
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/especialidades/nueva") //
    public Especialidad create(@RequestBody Especialidad especialidad) {
        return especialidadService.createEspecialidad(especialidad);
    }

    //admin edita especialidad
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/especialidades/update/{id}")
    public Especialidad update(@PathVariable Long id, @RequestBody Especialidad especialidad) {
        return especialidadService.updateEspecialidad(id, especialidad);
    }

    //admin elimina especialidad
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/especialidades/delete/{id}")
    public void delete(@PathVariable Long id) {
        especialidadService.deleteEspecialidad(id);
    }

    //tengo duda de cuando el paciente va a sacar un turno se listan las especialidades en un momento
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/especialidades")
    public List<Especialidad> getAll() {
        return especialidadService.getAllEspecialidades();
    }

    //aca tambien tengo la misma duda
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/especialidades/get/{id}")
    public Especialidad getById(@PathVariable Long id) {
        return especialidadService.getEspecialidadById(id)
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
    }
}
