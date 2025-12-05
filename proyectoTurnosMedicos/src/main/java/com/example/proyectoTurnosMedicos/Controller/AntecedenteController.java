package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.Antecedentes;
import com.example.proyectoTurnosMedicos.Entity.DTO.AntecedenteDto;
import com.example.proyectoTurnosMedicos.Service.AntecedenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class AntecedenteController {

    @Autowired
    AntecedenteService antecedenteService;

    //medico se trae los antecedentes del paciente
    @PreAuthorize("hasAnyRole('MEDICO')")
    @GetMapping("/medicos/paciente/{id_paciente}/antecedentes/get-antecedentes")
    public AntecedenteDto getAntecedentesByID(@PathVariable Long id_paciente){
        return antecedenteService.getAntecedenteById(id_paciente);
    }

    //medico agrega antecedente, primera vez que viene el paciente
    @PreAuthorize("hasAnyRole('MEDICO')")
    @PostMapping("/medicos/pacientes/{id_paciente}/antecedentes/create-antecedentes")
    public AntecedenteDto createAntecedente (@PathVariable Long id_paciente, @RequestBody AntecedenteDto antecedenteDto){
        return antecedenteService.createAntenecedente(id_paciente, antecedenteDto);
    }

    @PreAuthorize("hasAnyRole('MEDICO')")
    @PutMapping("/medicos/pacientes/{id_paciente}/antecedentes/update-antecedentes")
    public AntecedenteDto updateAntecedentes(@PathVariable Long id_paciente, @RequestBody AntecedenteDto antecedenteDto){
        return antecedenteService.updateAntecedentes(id_paciente, antecedenteDto);
    }


}
