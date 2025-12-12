import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-medico',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './menu-medico.component.html',
  styleUrls: ['./menu-medico.component.css']
})
export class MenuMedicoComponent {
  @Input() medicoId!: number; 
}

