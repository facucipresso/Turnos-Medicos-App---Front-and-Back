package com.example.proyectoTurnosMedicos.Controller;

import com.example.proyectoTurnosMedicos.Entity.DTO.EmailDNIUser;
import com.example.proyectoTurnosMedicos.Entity.DTO.PacienteDto;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import com.example.proyectoTurnosMedicos.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PacienteController {

    @Autowired
    PacienteService pacienteService;

    //el paciente se hace una cuenta
    @PreAuthorize("hasAnyRole('PACIENTE', 'RECEPCIONISTA')")
    @PostMapping("/singin/create-paciente")
    public PacienteDto createPaciente(@RequestBody PacienteDto pacienteDto){
        return pacienteService.cretePaciente(pacienteDto);
    }

    //---------------------------------------------------------------------------
    // NO SE SI FALTA PARA CUANDO EL PACIENTE YA ESTA CREADO Y TIENE SU CUENTA YA
    //---------------------------------------------------------------------------

    //el paciente puede actualizar sus datos, NO ESTA IMPLEMENTADO
    @PutMapping("/singin/update-paciente/{id_paciente}")
    public PacienteDto updatePaciente(@PathVariable Long id_paciente, @RequestBody PacienteDto pacienteDto){
        return pacienteService.updatePaciente(id_paciente, pacienteDto);
    }

    //el medico puede listar todos los pacientes de la clinica
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    @GetMapping("/medicos/findAllPacientes")
    public List<PacienteDto> findAllPacientes(){
        return pacienteService.findAllPacientes();
    }

    //admin o medico quiere eliminar un paciente, por muerte o por otra cosa
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/medicos/pacientes/{id_paciente}/delete-paciente")
    public void deletePaciente(@PathVariable Long id_paciente){
        pacienteService.deletePacienteById(id_paciente);
    }

    // Encontrar paciente por id
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    @GetMapping("/medicos/pacientes/{id}")
    public PacienteDto getPacienteById(@PathVariable Long id) {
        return pacienteService.getPacienteById(id);
    }

    @PreAuthorize("hasAnyRole('RECEPCIONISTA')")
    @PostMapping("/recepcionistas/get-idPaciente")
    public PacienteDto getIdByEmailandDni(@RequestBody EmailDNIUser datosUser){
        return pacienteService.getIdByPacienteEmailandDni(datosUser);
    }
}
