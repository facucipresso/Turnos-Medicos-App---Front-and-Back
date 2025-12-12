import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacienteService } from '../../paciente.service';
import { Paciente } from '../../paciente.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'app-paciente-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatCardTitle], // esto sirve si lo declarás standalone
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'] 
})
export class PacienteListComponent implements OnInit {
  esMedico = false;
  medicoId!: number;
  administradorId!: number;
  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idMedicoParam = params.get('id_medico');
      if (!idMedicoParam) {
        idMedicoParam = this.route.parent?.snapshot.paramMap.get('id_medico') ?? null;
      }

      let idAdminParam = params.get('id_administrador');
      if(!idAdminParam){
        idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
      }

      if (idMedicoParam) {
        this.esMedico = true;
        this.medicoId = Number(idMedicoParam);
        this.cargarPacientes();
      }else if(idAdminParam) {
        this.esMedico = false;
        this.administradorId = Number(idAdminParam);
        this.cargarPacientes();
      }else {
        this.cargarPacientes();
      }

    });
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al cargar los pacientes: ', err)
    });
  }

  /* ESTO YA NO SE HACE DESDE ACA
  irACrearPaciente(){ this.router.navigate(['pacientes/nuevo']); } */


  editPaciente(id: number){  
    this.router.navigate(['admin', this.administradorId, 'pacientes', 'editar', id]); 

  }


  eliminarPaciente(id: number){
    if(confirm('Estas seguro que queres eliminar este paciente?')){
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => {

          this.cargarPacientes(); // sirve tanto para admin como para médico
          alert('Paciente eliminado correctamente');
        },
        error: (err) => console.error(err)
      });
    }
  }
  
  verAntecedentes(id: number){ 
    this.router.navigate(['medico', this.medicoId, 'paciente', id, 'antecedentes']); 
  }

  verHistorial(id: number){
     this.router.navigate(['medico', this.medicoId, 'pacientes', id, 'historial-medico']); 
  }

  trackById(index: number, item: Paciente) { 
    return item.id; 
  }


}
