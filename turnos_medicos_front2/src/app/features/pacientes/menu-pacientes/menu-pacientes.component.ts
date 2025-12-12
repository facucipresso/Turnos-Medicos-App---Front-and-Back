import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-menu-pacientes',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './menu-pacientes.component.html',
  styleUrls: ['./menu-pacientes.component.css']
})
export class MenuPacientesComponent {
  @Input() pacienteId!: number;
}
