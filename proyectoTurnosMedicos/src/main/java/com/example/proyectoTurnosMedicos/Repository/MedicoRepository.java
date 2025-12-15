package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.Especialidad;
import com.example.proyectoTurnosMedicos.Entity.Medico;
import com.example.proyectoTurnosMedicos.Entity.ObraSocial;
import com.example.proyectoTurnosMedicos.Entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    //List<Medico> findByEspecialidad(Especialidad especialidad);

    List<Medico> findByEspecialidadesContaining(Especialidad especialidad);

    @Query("SELECT m FROM Medico m JOIN m.turnos t WHERE t.id = :idTurno")
    Optional<Medico> findByIdTurno(@Param("idTurno") Long idTurno);
    //List<Medico> findMedicosByObraSocial(ObraSocial obraSocial);
    List<Medico> findByObrasSociales_Id(Long obraSocialId);
    Optional<Medico> findByUsuario_Id(Long id_usuario);

    @Query("SELECT m FROM Medico m JOIN m.especialidades e WHERE e.id = :idEspecialidad")
    List<Medico> buscarPorIdEspecialidad(Long idEspecialidad);

    Optional<Medico> findByNombreAndApellido(String nombre, String apellido);
    Optional<Medico> findByNombreIgnoreCaseAndApellidoIgnoreCase(String nombre, String apellido);

}
