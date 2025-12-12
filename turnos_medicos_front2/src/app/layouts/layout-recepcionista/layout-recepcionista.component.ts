import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuRecepcionistaComponent } from '../../features/recepcionista/menu-recepcionista/menu-recepcionista.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-recepcionista',
  standalone: true,
  imports: [MenuRecepcionistaComponent, RouterOutlet],
  templateUrl: './layout-recepcionista.component.html',
  styleUrl: './layout-recepcionista.component.css'
})
export class LayoutRecepcionistaComponent {
  recepcionistaId!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.recepcionistaId = Number(this.route.snapshot.paramMap.get('id_recepcionista'));
  }
}
