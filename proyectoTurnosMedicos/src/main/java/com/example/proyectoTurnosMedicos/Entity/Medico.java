package com.example.proyectoTurnosMedicos.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Data
@Entity
public class Medico extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

   /* @Column(nullable = false)
    public String especialidad;*/
   @Column(nullable = false)
   public String matricula;
/*
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "especialidad_id", nullable = false)
    private Especialidad especialidad;
*/

    @ManyToMany(
            cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "medico_especialidad",
            joinColumns = @JoinColumn(name = "medico_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "especialidad_id", referencedColumnName = "id")
    )
    private List<Especialidad> especialidades;



    //relacion muchos a muchos con obras sociales
    @ManyToMany(
            cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "medico_obraSocial",
            joinColumns = @JoinColumn(name = "medico_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "obraSocial_id", referencedColumnName = "id")
    )
    private List<ObraSocial> obrasSociales;

    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference//@JsonManagedReference
    private List<Turno> turnos;

    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<HistorialMedico> historialMedicos;

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;
}
