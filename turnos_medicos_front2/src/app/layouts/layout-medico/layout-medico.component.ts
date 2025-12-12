import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuMedicoComponent } from '../../features/medicos/menu-medico/menu-medico.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-medico',
  imports: [MenuMedicoComponent, RouterOutlet],
  templateUrl: './layout-medico.component.html',
  styleUrls: ['./layout-medico.component.css']
})
export class LayoutMedicoComponent implements OnInit{

  medicoId!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.medicoId = Number(this.route.snapshot.paramMap.get('id_medico'));
  }

}
