package com.example.proyectoTurnosMedicos.Controller;


import com.example.proyectoTurnosMedicos.Entity.DTO.TurnoDTO;
import com.example.proyectoTurnosMedicos.Entity.Turno;
import com.example.proyectoTurnosMedicos.Service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TurnoController {

    @Autowired
    TurnoService turnoService;

    //el medico crea un turno
    @PreAuthorize("hasAnyRole('MEDICO')")
    @PostMapping("/medicos/{id_medico}/create-turno")
    public TurnoDTO createTurno(@PathVariable Long id_medico, @RequestBody TurnoDTO turnodto){
        return turnoService.createTurno(id_medico, turnodto);
    }

    //el medico modifica un turno
    @PreAuthorize("hasAnyRole('MEDICO')")
    @PutMapping("/medicos/{id_medico}/update-turno/{id_turno}")
    public TurnoDTO updateTurno(@PathVariable("id_medico") Long id_medico, @PathVariable("id_turno") Long id_turno, @RequestBody TurnoDTO turnoDTO){
        return turnoService.updateTurno(id_medico, id_turno, turnoDTO);
    }

    // el medico elimina un turno
    @PreAuthorize("hasAnyRole('MEDICO')")
    @DeleteMapping("/medicos/{id_medico}/delete-turno/{id_turno}")
    public void deleteTurno(@PathVariable("id_medico") Long id_medico, @PathVariable("id_turno") Long id_turno){
        turnoService.deleteTurno(id_medico, id_turno);
    }

    // el medico puede ver todos sus turnos
    @PreAuthorize("hasAnyRole('MEDICO', 'PACIENTE')")
    @GetMapping("/medico/{id_medico}/find-my-turnos")
    public List<Turno> findTurnosByMedico(@PathVariable Long id_medico){
        return turnoService.findTurnosByMedico(id_medico);
    }

    // encuentra un turno por id
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/medico/find-turno/{id_turno}")
    public Turno findTurnoById(@PathVariable Long id_turno){
        return turnoService.findTurnoById(id_turno);
    }

    //medico obtiene sus turnos reservados
    @PreAuthorize("hasAnyRole('MEDICO')")
    @GetMapping("/medico/{id_medico}/find-turnos-reservados")
    public List<Turno> findTurnosReservados(@PathVariable Long id_medico){
        return turnoService.findTurnosReservados(id_medico);
    }

    //cambia al estado reservado:true
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/paciente/reservar-turno/{id_turno}")
    public boolean reservarTurno(@PathVariable Long id_turno){
        return turnoService.reservarTurno(id_turno);
    }
}
