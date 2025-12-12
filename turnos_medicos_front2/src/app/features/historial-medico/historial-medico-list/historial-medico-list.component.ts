import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialMedico } from '../historial-medico.model';
import { HistorialMedicoDto } from '../historial-medico-dto.model';
import { HistorialMedicoService } from '../historial-medico.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-historial-medico-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './historial-medico-list.component.html',
  styleUrl: './historial-medico-list.component.css'
})
export class HistorialMedicoListComponent implements OnInit{

  medicoId!: number;
  pacienteId!: number;
  historiales: HistorialMedico[] = [];

  constructor(
    private historialMedicoService: HistorialMedicoService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pacienteIdParam = params.get('id_paciente');
      if (pacienteIdParam) {
        this.pacienteId = Number(pacienteIdParam);
      }
    });
  
    this.route.parent?.paramMap.subscribe(parentParams => {
      const medicoIdParam = parentParams.get('id_medico');
      if (medicoIdParam) {
        this.medicoId = Number(medicoIdParam);
      }
    });

    if (this.pacienteId) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void{
    this.historialMedicoService.getHistorialDePaciente(this.medicoId, this.pacienteId).subscribe({
      next: (data) => {
        this.historiales = data;
      },
      error: (err) => {
        console.error('Error al cargar el historial: ', err);
      }
    });
  }

  irAgregarHistorial(){
    this.router.navigate(['medico',this.medicoId,'pacientes',this.pacienteId, 'historial-medico', 'add-historial-medico']);
  }

  eliminarEntradaDelHistorial(id_historial: number): void{
    const confirmado = confirm('Estas seguro que queres eliminar este registro del historial del paciente?');
    if(confirmado){
      this.historialMedicoService.deleteHistorial(this.medicoId, this.pacienteId,id_historial).subscribe({
        next: () => {
          console.log('Registro de historial eliminado');
          this.cargarHistorial();
        },
        error: (err) => {
          console.error('Error al eliminar el registro del historial: ', err);
        }
      });
    }
  }

}
