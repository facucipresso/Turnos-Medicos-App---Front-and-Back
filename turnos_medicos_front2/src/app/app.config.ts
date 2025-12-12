import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = localStorage.getItem('token');
          if (
            token &&
            !req.url.includes('/auth/login') &&
            !req.url.includes('/auth/register')
          ) {
            const cloned = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next(cloned);
          }
          return next(req);
        }
      ])
    ),
    provideAnimations(), 
    importProvidersFrom(
      MatButtonModule,
      MatToolbarModule
    )
  ]
};
