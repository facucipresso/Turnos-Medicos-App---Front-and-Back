package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.HistorialMedicoRequestDto;
import com.example.proyectoTurnosMedicos.Service.HistorialMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HistorialMedicoController {

    @Autowired
    HistorialMedicoService historialMedicoService;

    //medico se trae todo el historial de un paciente
    @PreAuthorize("hasAnyRole('MEDICO')")
    @GetMapping("/medicos/{id_medico}/pacientes/{id_paciente}/historial-medico/get-historial-medico")
    public List<HistorialMedicoRequestDto> getHistorialById(@PathVariable("id_paciente") Long id_paciente){
        return historialMedicoService.findByPacienteId(id_paciente);
    }

    //medico agrega una entrada al historial medico de un paciente
    @PreAuthorize("hasAnyRole('MEDICO')")
    @PostMapping("/medicos/{id_medico}/pacientes/{id_paciente}/historial-medico/add-historial-medico")
    public HistorialMedicoRequestDto addHistorialMedico(@PathVariable("id_medico") Long id_medico, @PathVariable("id_paciente") Long id_paciente, @RequestBody HistorialMedicoDto historialMedicoDto){
        return historialMedicoService.addHistorialMedico(id_medico, id_paciente, historialMedicoDto);
    }

    //medico elimina entrada del historial porque se equivoco en algo, no hay opcion de actualizar historial
    @PreAuthorize("hasAnyRole('MEDICO')")
    @DeleteMapping("/medicos/{id_medico}/pacientes/{id_paciente}/historial-medico/delete-historial-medico/{id_historial}")
    public void deleteHistorialMedico(@PathVariable("id_medico") Long id_medico, @PathVariable("id_paciente") Long id_paciente,@PathVariable("id_historial") Long id_historial) {
        historialMedicoService.deleteHistorialMedico(id_medico, id_paciente, id_historial);
    }

}
