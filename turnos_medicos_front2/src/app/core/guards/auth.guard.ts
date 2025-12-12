import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsuarioService } from '../../features/Usuarios/usuario.service';

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.usuarioService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const rolUsuario = decoded.role;
    const rolesPermitidos = route.data['roles'] as string[];

    if (!rolesPermitidos.includes(rolUsuario)) {
      this.router.navigate(['/login']); // o a alguna pag de “acceso denegado”
      return false;
    }

    return true;
  }
}
