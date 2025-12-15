import { Routes } from '@angular/router';

import { ObraSocialFormComponent } from './features/obras-sociales/form/obra-social-form/obra-social-form.component';
import { ObraSocialListComponent } from './features/obras-sociales/list/obra-social-list/obra-social-list.component';
import { MedicoFormComponent } from './features/medicos/form/medico-form/medico-form.component';
import { MedicoListComponent } from './features/medicos/list/medico-list/medico-list.component';
import { PacienteFormComponent } from './features/pacientes/form/paciente-form/paciente-form.component';
import { PacienteListComponent } from './features/pacientes/list/paciente-list/paciente-list.component';
import { TurnoCreateComponent } from './features/turnos/create/turno-create/turno-create.component';
import { TurnosListComponent } from './features/turnos/list/turnos-list/turnos-list.component';
import { EspecialidadesFormComponent } from './features/especialidades/form/especialidades-form.component';
import { EspecialidadesListComponent } from './features/especialidades/list/especialidades-list.component';
import { ReservaCrearComponent } from './features/reservas/crear/reserva-crear.component';
import { ReservasMedicoComponent } from './features/reservas/medico/reservas-medico/reservas-medico.component';
import { ReservasPacienteComponent } from './features/reservas/paciente/reservas-paciente/reservas-paciente.component';
import { AntecedentesCreateComponent } from './features/antecedentes/antecedentes-create/antecedentes-create.component';
import { HistorialMedicoAddComponent } from './features/historial-medico/historial-medico-add/historial-medico-add.component';
import { HistorialMedicoListComponent } from './features/historial-medico/historial-medico-list/historial-medico-list.component';
import { RegistroMedicoComponent } from './features/medicos/registro/registro-medico/registro-medico.component';
import { RecepcionistaReservarTurnoComponent } from './features/recepcionista/reservas/recepcionista-reservar-turno/recepcionista-reservar-turno.component';
import { RecepcionistaCancelarReservaComponent } from './features/recepcionista/reservas/recepcionista-cancelar-reserva/recepcionista-cancelar-reserva.component';

import { LayoutMedicoComponent } from './layouts/layout-medico/layout-medico.component';
import { LayoutPacienteComponent } from './layouts/layout-paciente/layout-paciente.component';
import { LayoutAdministradorComponent } from './layouts/layout-administrador/layout-administrador.component';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { LayoutRecepcionistaComponent } from './layouts/layout-recepcionista/layout-recepcionista.component';

import { RegistroPacienteComponent } from './features/pacientes/regitro/registro-paciente/registro-paciente.component';
import { UsuarioLoginComponent } from './features/Usuarios/usuario-login/usuario-login.component';

import { AuthGuard } from './core/guards/auth.guard';
import { EditmedicoComponent } from './features/medicos/editmedico/editmedico.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutAppComponent,
    children: [
      // Layout para login/registro
      {
        path: '',
        component: LayoutAuthComponent,
        children: [
          { path: 'login', component: UsuarioLoginComponent },
          { path: 'registro', component: RegistroPacienteComponent },
          { path: 'pacientes/nuevo/:id_usuario', component: PacienteFormComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
      },

      // Layout para médico logueado
      {
        path: 'medico/:id_medico',
        component: LayoutMedicoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['MEDICO'] },
        children: [
          { path: '', redirectTo: 'reservas', pathMatch: 'full' },
          { path: 'reservas', component: ReservasMedicoComponent },
          { path: 'turnos', component: TurnosListComponent },
          { path: 'crear-turno', component: TurnoCreateComponent },
          { path: 'editar/:id_turno', component: TurnoCreateComponent },
          { path: 'pacientes', component: PacienteListComponent },
          { path: 'pacientes/:id_paciente/historial-medico', component: HistorialMedicoListComponent },
          { path: 'pacientes/:id_paciente/historial-medico/add-historial-medico', component: HistorialMedicoAddComponent },
          { path: 'paciente/:id_paciente/antecedentes', component: AntecedentesCreateComponent },
          { path: 'obras-sociales', component: ObraSocialListComponent },
        ]
      },

      // Layout para paciente logueado
      {
        path: 'paciente/:id_paciente',
        component: LayoutPacienteComponent,
        canActivate: [AuthGuard],
        data: { roles: ['PACIENTE'] },
        children: [
          { path: '', redirectTo: 'reservas/mis-reservas', pathMatch: 'full'},
          { path: 'reservas/mis-reservas', component: ReservasPacienteComponent},
          { path: 'reservas/crear', component: ReservaCrearComponent}
        ]
      },

      // Layout para administrador
      {
        path: 'admin/:id_administrador',
        component: LayoutAdministradorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: '', redirectTo: 'obras-sociales', pathMatch: 'full' },
          { path: 'obras-sociales', component: ObraSocialListComponent },
          { path: 'obras-sociales/nueva', component: ObraSocialFormComponent },
          { path: 'obras-sociales/editar/:id', component: ObraSocialFormComponent },
          { path: 'especialidades', component: EspecialidadesListComponent },
          { path: 'especialidades/nueva', component: EspecialidadesFormComponent },
          { path: 'especialidades/editar/:id', component: EspecialidadesFormComponent },
          { path: 'medicos', component: MedicoListComponent },
          { path: 'medicos/editar', component: EditmedicoComponent },
          { path: 'pacientes', component: PacienteListComponent },
          { path: 'pacientes/editar/:id_paciente', component: PacienteFormComponent },
          { path: 'registro', component: RegistroMedicoComponent},//toma email y contra
          { path: 'medicos/nuevo/:id_usuario', component: MedicoFormComponent} //toma el resto de los datos
        ]
      },

      // Layout para recepcionista
      {
        path: 'recepcionista/:id_recepcionista',
        component: LayoutRecepcionistaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['RECEPCIONISTA'] },
        children: [
          { path: '', redirectTo: 'reservas', pathMatch: 'full' },
          { path: 'reservas', component: RecepcionistaReservarTurnoComponent },
          { path: 'pacientes/nuevo', component: PacienteFormComponent },
          { path: 'reservas/cancelar', component: RecepcionistaCancelarReservaComponent }

        ]
      }
    ]
  }
];