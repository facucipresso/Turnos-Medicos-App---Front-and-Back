package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.ObraSocialDto;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;
import com.example.proyectoTurnosMedicos.Service.ObraSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ObraSocialController {

    @Autowired
    ObraSocialService obraSocialService;

    // el admin agrega obra social al sistema
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/admin/saveObraSocial")
    public ObraSocialDto createObraSocial (@RequestBody ObraSocialDto obraSocialDto){
        return obraSocialService.createObraSocial(obraSocialDto);
    }

    //el admin actualiza obra social
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/admin/updateObraSocial/{id_obraSocial}")
    public ObraSocialDto updateObraSocial(@PathVariable Long id_obraSocial, @RequestBody ObraSocialDto obraSocialDto){
        return obraSocialService.updateObraSocial(id_obraSocial, obraSocialDto);
    }

    //el admin elimina una obra social del sistema
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/admin/deleteObraSocial/{id_obraSocial}")
    public void deleteObraSocial (@PathVariable Long id_obraSocial){
        obraSocialService.deleteObraSocialById(id_obraSocial);
    }

    // el paciente busca medicos atienden por una obra social
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/pacientes/obraSocial/{id_obraSocial}/medicos")
    List<Medico> findMedicosByObraSocial(@PathVariable Long id_obraSocial){
        return obraSocialService.findMedicosByObraSocial(id_obraSocial);
    }

    // el paciente o quien sea obtiene la lista completa de obras sociales
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE', 'RECEPCIONISTA')")
    @GetMapping("/obras-sociales")
    public List<ObraSocial> getAllObrasSociales() {
        return obraSocialService.getObrasSociales();
    }

    // obtener una obra social por su ID
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/obras-sociales/{id}")
    public ResponseEntity<ObraSocial> getObraSocialById(@PathVariable Long id) {
        ObraSocial obraSocial = obraSocialService.getObraSocialById(id);
        if (obraSocial != null) {
            return ResponseEntity.ok(obraSocial);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //obtengo las obras sociales con las que trabaja un medico
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/medicos/{id_medico}/mis-obras-sociales")
    public List<ObraSocial> getObrasSocialesByMedicoId(@PathVariable Long id_medico){
        return obraSocialService.getObrasSocialesByMedicoId(id_medico);
    }



}
