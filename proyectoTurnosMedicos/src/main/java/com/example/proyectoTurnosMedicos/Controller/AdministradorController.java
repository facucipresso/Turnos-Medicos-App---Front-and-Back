package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.AdministradorDto;
import com.example.proyectoTurnosMedicos.Service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdministradorController {

    @Autowired
    AdministradorService administradorService;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/singin/create-admin")
    public AdministradorDto createPaciente(@RequestBody AdministradorDto administradorDto){
        return administradorService.createAdmin(administradorDto);
    }
}
