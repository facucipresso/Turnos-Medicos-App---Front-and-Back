package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.ObraSocialDto;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;

import java.util.List;

public interface ObraSocialService {

    ObraSocialDto createObraSocial(ObraSocialDto obraSocialDto);
    ObraSocialDto updateObraSocial(Long id_obraSocial, ObraSocialDto obraSocialDto);
    void deleteObraSocialById(Long id_obraSocial);
    List<Medico> findMedicosByObraSocial(Long id_obraSocial);
    List<ObraSocial> getObrasSociales();
    ObraSocial getObraSocialById(long id);
    List<ObraSocial> getObrasSocialesByMedicoId(Long id_medico);
}
