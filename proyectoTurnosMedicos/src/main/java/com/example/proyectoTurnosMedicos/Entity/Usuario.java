package com.example.proyectoTurnosMedicos.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(rol.name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override //indica que esta cuenta, este usuario no ha expirado
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override //valida si la cuenta no ha sigo bloqueada
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override //valida si las credenciales no han expirado
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override //todos los usuarios que voy creando estan habilitados
    public boolean isEnabled(){
        return true;
    }
}
