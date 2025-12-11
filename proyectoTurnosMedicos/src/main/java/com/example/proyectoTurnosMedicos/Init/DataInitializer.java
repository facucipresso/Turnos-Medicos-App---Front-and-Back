package com.example.proyectoTurnosMedicos.Init;

import com.example.proyectoTurnosMedicos.Entity.Administrador;
import com.example.proyectoTurnosMedicos.Entity.Recepcionista;
import com.example.proyectoTurnosMedicos.Entity.Rol;
import com.example.proyectoTurnosMedicos.Entity.Usuario;
import com.example.proyectoTurnosMedicos.Repository.AdministradorRepository;
import com.example.proyectoTurnosMedicos.Repository.RecepcionistaRepository;
import com.example.proyectoTurnosMedicos.Security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private RecepcionistaRepository recepcionistaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        //
        // === ADMIN INICIAL ===
        //
        // Cambiar este email y contraseña al que quiera; idealmente leer de properties
        final String adminEmail = "admin@localhost";
        final String adminPassword = "admin123";

        // Si ya existe un usuario con rol ADMIN, salimos
        boolean adminExists = usuarioRepository.findUserByEmail(adminEmail).isPresent()
                && usuarioRepository.findUserByEmail(adminEmail).get().getRol() == Rol.ADMIN;

        if (!adminExists) {
            // Crear Usuario (credenciales)
            Usuario usuario = Usuario.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .rol(Rol.ADMIN)
                    .build();
            usuarioRepository.save(usuario);

            // Crear la entidad Administrador y vincularla al Usuario
            Administrador administrador = new Administrador();
            administrador.setDni("17682653");
            administrador.setNombre("Administrador");
            administrador.setApellido("Inicial");
            administrador.setDireccion("Sistema");
            administrador.setUsuario(usuario);

            administradorRepository.save(administrador);

            System.out.println("ADMIN inicial creado: " + adminEmail + " (cambiar contraseña en producción)");
        } else {
            System.out.println("ADMIN ya existe, no se crea uno nuevo");
        }

        //
        // === RECEPCIONISTA INICIAL ===
        //
        final String recepEmail = "recepcion@localhost";
        final String recepPassword = "recep123";

        boolean recepExists = usuarioRepository.findUserByEmail(recepEmail)
                .filter(u -> u.getRol() == Rol.RECEPCIONISTA)
                .isPresent();

        if (!recepExists) {
            Usuario usuarioR = Usuario.builder()
                    .email(recepEmail)
                    .password(passwordEncoder.encode(recepPassword))
                    .rol(Rol.RECEPCIONISTA)
                    .build();
            usuarioRepository.save(usuarioR);

            Recepcionista recepcionista = new Recepcionista();
            recepcionista.setDni("42525422");
            recepcionista.setNombre("Recepcionista");
            recepcionista.setApellido("Inicial");
            recepcionista.setDireccion("Mostrador");
            recepcionista.setUsuario(usuarioR);

            recepcionistaRepository.save(recepcionista);

            System.out.println("[INIT] RECEPCIONISTA creado");
        } else {
            System.out.println("[INIT] RECEPCIONISTA ya existía");
        }
    }

}
