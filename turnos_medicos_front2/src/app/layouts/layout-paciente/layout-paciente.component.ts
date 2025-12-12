import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuPacientesComponent } from '../../features/pacientes/menu-pacientes/menu-pacientes.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-paciente',
  imports: [MenuPacientesComponent, RouterOutlet],
  templateUrl: './layout-paciente.component.html',
  styleUrls: ['./layout-paciente.component.css']
})
export class LayoutPacienteComponent implements OnInit{

  pacienteId!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.pacienteId = Number(this.route.snapshot.paramMap.get('id_paciente'));
  }
}
