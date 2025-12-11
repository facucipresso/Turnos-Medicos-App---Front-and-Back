package com.example.proyectoTurnosMedicos.Repository;

import com.example.proyectoTurnosMedicos.Entity.Administrador;
import com.example.proyectoTurnosMedicos.Entity.Recepcionista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Long> {
    Optional<Recepcionista> findByUsuario_Id(Long id_usuario);

}
