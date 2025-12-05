package com.example.proyectoTurnosMedicos.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Administrador extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;
}
