package com.example.proyectoTurnosMedicos.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class ObraSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String nombreObraSocial;
    private String planObraSocial;

    //relacion muchos a muchos con medicos y la relacion esta mapeada en medicos
    @ManyToMany(mappedBy = "obrasSociales")
    @JsonIgnore
    private List<Medico> medicos;

    @OneToMany(mappedBy = "obraSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<HistorialMedico> historialMedicos;
}
