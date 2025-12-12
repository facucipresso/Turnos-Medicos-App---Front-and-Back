import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from "../features/Usuarios/usuario.service";

export class AuthInterceptor implements HttpInterceptor{
    constructor(private usuarioService: UsuarioService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.usuarioService.getToken();
    
        //No agrego token en login y registro
        if (req.url.includes('/api/auth/authenticate') || req.url.includes('/api/auth/register')) {
          const cleanReq = req.clone({ setHeaders: {} }); // <-- elimino cualquier token residual
          return next.handle(cleanReq);
        }
    
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(cloned);
        }
    
        return next.handle(req);
      }

}