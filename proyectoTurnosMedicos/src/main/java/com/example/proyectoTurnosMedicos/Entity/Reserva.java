package com.example.proyectoTurnosMedicos.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "reserva",
        uniqueConstraints = @UniqueConstraint(columnNames = {"paciente_id", "turno_id"})
)
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne
    @JoinColumn(name = "turno_id", unique = true)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "paciente_id")//, unique = true
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "obraSocial_id")
    private ObraSocial obrasocial;

}
