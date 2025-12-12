import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-recepcionista',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './menu-recepcionista.component.html',
  styleUrl: './menu-recepcionista.component.css'
})
export class MenuRecepcionistaComponent {
  @Input() recepcionistaId!: number;
}
