package com.example.proyectoTurnosMedicos.Security.config;

import java.util.List;
import com.example.proyectoTurnosMedicos.Security.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        /*HttpServletRequest → representa la petición HTTP (headers, parámetros, body, etc.).
          HttpServletResponse → representa la respuesta HTTP que vas a devolver.
          FilterChain → permite que después de tu filtro, otros filtros de Spring sigan ejecutándose.*/

        String path = request.getServletPath();

        // IGNORAR ENDPOINTS DE AUTH
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        //header de autorizacion que vamos a necesitar, viene del encabezado de autorizacion (de postman por ej)
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        //valido si me esta enviando un header osea un jwt, si es nulo retorna err 403, si manda creden pero no empiezan con Bearer
        if(authHeader  == null || !authHeader.startsWith("Bearer")){
            //Si el endpoint es público (permitAll en mi SecurityConfig), va a pasar sin problemas.
            //Si el endpoint es protegido (authenticated()), entonces más adelante Spring Security me lodetecta que no hay un usuario autenticado en el SecurityContextHolder y devuelve 403

            filterChain.doFilter(request, response);
            return;
        }

        //manda "Bearer kjlasdglñajglñajlgajglkjal" yo quiero a partir del caracter 7
        jwt = authHeader.substring(7);
        //quiero extraer el email de token
        userEmail = jwtService.getUserName(jwt);
        //sie l usuario existe y no esta autenticado, sigo con el proceso de autenticacion
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
            //va a la bbdd y verifica que el usuario con ese email realmente exista
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            //valido si el token es valido, si es valido sino con el proceso, sino 403
            if(jwtService.validateToken(jwt, userDetails)) {
                String role = jwtService.extractRole(jwt);
                //convierto el rol en un grantedAuthority ("ROLE_MEDICO)
                var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        authorities
                );
                authenticationToken.setDetails( new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);

    }
}
