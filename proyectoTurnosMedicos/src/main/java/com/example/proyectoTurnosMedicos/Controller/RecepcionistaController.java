package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.AdministradorDto;
import com.example.proyectoTurnosMedicos.Entity.DTO.RecepcionistaDto;
import com.example.proyectoTurnosMedicos.Service.AdministradorService;
import com.example.proyectoTurnosMedicos.Service.RecepcionistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecepcionistaController {

    @Autowired
    RecepcionistaService recepcionistaService;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/singin/create-recepcionista")
    public RecepcionistaDto create(@RequestBody RecepcionistaDto dto){
        return recepcionistaService.create(dto);
    }
}
/*
public class RecepcionistaController{

    @Autowired
    AdministradorService administradorService;
    RecepcionistaService recepcionistaService;

    //@PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/singin/create-recepcionista")
    public AdministradorDto createPaciente(@RequestBody RecepcionistaDto recepcionistaDto){
        return recepcionistaService.createRecepcionista(recepcionistaDto);
    }
}*/
