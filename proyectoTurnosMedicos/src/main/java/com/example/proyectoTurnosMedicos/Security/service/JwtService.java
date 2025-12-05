package com.example.proyectoTurnosMedicos.Security.service;

import com.example.proyectoTurnosMedicos.Entity.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // no es recomendable ponerla aca, va con fines practicos (ver donde ponerla)
    private static final String SECRET_KEY = "90a6b72cf0f06609411c848c2b39fa38b0693ae952f3d41fd6775458e09cf981";

    public String generateToken(UserDetails userDetails){

        Usuario usuario = (Usuario) userDetails;
        //meto el rol para que tambien lo incluya en el token
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", usuario.getRol().name());

        return generateToken(claims, userDetails);
    }

    public String generateToken(Map<String,  Object> extraClaims, UserDetails userDetails){
        return Jwts.builder().setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date (System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUserName(String token){
        //creo metodo generico, Claim = información dentro del token (ej: username, roles, expiración, etc.) es el payload completo
        return getClaim(token, Claims::getSubject); //obtengo el nombre del usuario del token que se envia
    }

    private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = getUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return  getExpiration(token).before(new Date());
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    public String extractRole(String token) {
        return getClaim(token, claims -> claims.get("role", String.class));
    }

}
