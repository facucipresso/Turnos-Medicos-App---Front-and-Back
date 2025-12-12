package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.MedicoDto;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class MedicoController {

    @Autowired
    MedicoService medicoService;

    // el admin agrega un medico al sistema
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    @PostMapping("/medicos/create")
    public MedicoDto createMedico(@RequestBody MedicoDto medicoDto){
        return medicoService.createMedico(medicoDto);
    }

    //el admin actualiza datos de un medico
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/admin/medicos/updateMedico/{id_medico}")
    public MedicoDto updateMedico(@PathVariable Long id_medico, @RequestBody MedicoDto medicoDto){
        return medicoService.updateMedico(id_medico, medicoDto);
    }

    //el admin se trae un madico, TIENE QUE DEVOLVER UN MEDICO
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/medicos/getMedico/{id_medico}")
    public Medico findMedicoById(@PathVariable Long id_medico){
        return medicoService.findMedicoById(id_medico);
    }

    //el admin borra un medico
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/admin/medicos/deleteMedico/{id_medico}")
    public void deleteMedicoById(@PathVariable Long id_medico){
        medicoService.deleteMedicoById(id_medico);
    }

    //puede ser accedido por todos los roles, TIENE QUE DEVOLVER UNA LISTA DE MEDICOS
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE')")
    @GetMapping("/medicos/findAllMedicos")
    public List<MedicoDto> findAllMedicos(){
        return medicoService.findAllMedicos();
    }

    //el medico se agrega una obra social para trabajar con ella
    @PreAuthorize("hasAnyRole('MEDICO')")
    @PostMapping("/medicos/{medico_id}/obras-sociales/add-obra-social/{obraSocial_id}")
    public Medico agregarObraSocial(@PathVariable("medico_id") Long id_medico, @PathVariable("obraSocial_id") Long id_obraSocial){
        return medicoService.agregarObraSocial(id_medico, id_obraSocial);
    }

    //el medico elimina una obraSocial con la que trabajaba que no quiere trabajar mas
    @PreAuthorize("hasAnyRole('MEDICO')")
    @DeleteMapping("/medicos/{medico_id}/obras-sociales/delete-obra-social/{obraSocial_id}")
    public Medico eliminarObrasocial(@PathVariable("medico_id") Long id_medico, @PathVariable("obraSocial_id") Long id_obraSocial){
        return medicoService.deleteObraSocial(id_medico, id_obraSocial);
    }

    //el paciente filtra medicos por especialidad, en un inicio no haria falta, pero para cuando escale si
    @PreAuthorize("hasAnyRole('PACIENTE')")
    @GetMapping("/medicos/especialidad/{idEspecialidad}")
    public List<MedicoDto> findMedicosByEspecialidad(@PathVariable Long idEspecialidad){
        return medicoService.findMedicoByEspecialidad(idEspecialidad);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    @GetMapping("/por-turno/{idTurno}")
    public MedicoDto getMedicoByTurno(@PathVariable Long idTurno) {
        return medicoService.obtenerMedicoPorTurno(idTurno);
    }

    //se filtra medicos por obra social
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO', 'PACIENTE', 'RECEPCIONISTA')")
    @GetMapping("/medicos/obra-social/{id_obraSocial}")
    public List<MedicoDto> getMedicosByObra(@PathVariable Long id_obraSocial){
        return medicoService.getMedicosByObraSocial(id_obraSocial);
    }


}
