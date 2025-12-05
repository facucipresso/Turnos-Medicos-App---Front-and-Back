package com.example.proyectoTurnosMedicos.Security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity //permite definir y habilidar la seguridad a nivel de metodos
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())//lo desactivo porque no trabajo con cookies
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                "/diHola", //endpoint de prueba
                                "/api/auth/**" //login, register  MODIFICAR Y PONER LOS ENDPOINTS PUBLICOS
                        ).permitAll()//defino los endppoints que son publics
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))//sin estado porque no tengo session, tengo los token
                // authenticationProvider = sistema de control de accesos
                .authenticationProvider(authenticationProvider)
                //que primero use el filtro para ver el token, si no pasa ese filtro puede ser el login porque este viene sin token
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}
