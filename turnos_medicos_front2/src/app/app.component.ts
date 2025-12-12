import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}





//SEGUNDO EDIT DE ANGULAR MATERIAL
/* import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  path: string;
  roles: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule
  ],
  template: `
    <!-- Toolbar superior -->
    <mat-toolbar color="primary">
      <span style="flex: 1;">Turnos Médicos</span>

      <!-- Menú dinámico -->
      <ng-container *ngFor="let item of navItems">
        <button
          *ngIf="item.roles.includes(userRole)"
          mat-button
          [routerLink]="item.path">
          {{ item.label }}
        </button>
      </ng-container>
    </mat-toolbar>

    <!-- Área de contenido -->
    <div style="padding: 1rem;">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turnos_medicos_front2';

  // Simulación de rol logueado
  userRole: 'paciente' | 'medico' | 'admin' = 'medico';

  // Menú dinámico según rol
  navItems: NavItem[] = [
    { label: 'Reservar Turno', path: '/reservar', roles: ['paciente'] },
    { label: 'Mis Turnos', path: '/turnos', roles: ['paciente', 'medico'] },
    { label: 'Pacientes', path: '/pacientes', roles: ['medico'] },
    { label: 'Obras Sociales', path: '/obras', roles: ['medico'] },
    { label: 'Administrar Usuarios', path: '/admin', roles: ['admin'] }
  ];
} */



/* PRIMER EDIT CON ANGULAR MATERIAL
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Turnos Médicos</span>
    </mat-toolbar>

    <div style="padding: 1rem;">
      <button mat-raised-button color="accent">Probar botón</button>
    </div>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turnos_medicos_front2';
} */


// SIN ANGULAR MATERIAL
/* import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObraSocialFormComponent } from './features/obras-sociales/form/obra-social-form/obra-social-form.component';
import { ObraSocialListComponent } from './features/obras-sociales/list/obra-social-list/obra-social-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'turnos_medicos_front2';
}
 */