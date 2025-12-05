package com.example.proyectoTurnosMedicos.Service;

import com.example.proyectoTurnosMedicos.Entity.DTO.ObraSocialDto;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;
import com.example.proyectoTurnosMedicos.Exception.BadRequestException;
import com.example.proyectoTurnosMedicos.Exception.ResourceNotFoundException;
import com.example.proyectoTurnosMedicos.Repository.ObraSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObraSocialServiceImp implements ObraSocialService {

    @Autowired
    ObraSocialRepository obraSocialRepository;

    private boolean isNullOrBlank(String str){
        return str == null || str.trim().isEmpty();
    }

    public ObraSocialDto createObraSocial(ObraSocialDto obraSocialDto){
        List<ObraSocial> obrasSocialesCargadas = obraSocialRepository.findAll();
        for(ObraSocial osocial : obrasSocialesCargadas){
            if(osocial.getNombreObraSocial().equals(obraSocialDto.getNombreObraSocial()) && osocial.getPlanObraSocial().equals(obraSocialDto.getPlanObraSocial())){
                throw new BadRequestException("Obra social ya cargada");
            }
        }
        ObraSocial os = new ObraSocial();
        os.setNombreObraSocial(obraSocialDto.getNombreObraSocial());
        os.setPlanObraSocial(obraSocialDto.getPlanObraSocial());
        ObraSocial obraSocial = obraSocialRepository.save(os);
        obraSocialDto.setNombreObraSocial(obraSocial.getNombreObraSocial());
        obraSocialDto.setPlanObraSocial(obraSocial.getPlanObraSocial());
        return obraSocialDto;
    }

    @Override
    public ObraSocialDto updateObraSocial(Long id_obraSocial, ObraSocialDto obraSocialDto) {
        ObraSocial os = obraSocialRepository.findById(id_obraSocial).
                orElseThrow(()->new ResourceNotFoundException("Obra social no encontrada"));
       if(isNullOrBlank(obraSocialDto.getNombreObraSocial()) || isNullOrBlank(obraSocialDto.getPlanObraSocial())){
           throw new BadRequestException("Campos incompletos");
       }
        os.setNombreObraSocial(obraSocialDto.getNombreObraSocial());
        os.setPlanObraSocial(obraSocialDto.getPlanObraSocial());
        ObraSocial osocial = obraSocialRepository.save(os);
        obraSocialDto.setNombreObraSocial(osocial.getNombreObraSocial());
        obraSocialDto.setPlanObraSocial(osocial.getPlanObraSocial());
        return obraSocialDto;
    }

    @Override
    public void deleteObraSocialById(Long id_obraSocial) {
        if(obraSocialRepository.findById(id_obraSocial).isEmpty()){
            throw new ResourceNotFoundException("Obra social no encontrada");
        }
        obraSocialRepository.deleteById(id_obraSocial);
    }

    @Override
    public List<Medico> findMedicosByObraSocial(Long id_obraSocial) {
        ObraSocial os = obraSocialRepository.findById(id_obraSocial).
                orElseThrow(()->new ResourceNotFoundException("Obra social no encontrada"));
        return os.getMedicos();
    }

    @Override
    public List<ObraSocial> getObrasSociales(){
        return obraSocialRepository.findAll();
    }

    @Override
    public ObraSocial getObraSocialById(long id) {
        Optional<ObraSocial> optionalObraSocial = obraSocialRepository.findById(id);

        if (optionalObraSocial.isEmpty()) {
            throw new ResourceNotFoundException("Obra social no encontrada con ID: " + id);
        }

        return optionalObraSocial.get();
    }

    @Override
    public List<ObraSocial> getObrasSocialesByMedicoId(Long id_medico){
        return obraSocialRepository.findByMedicos_Id(id_medico);
    }



}
