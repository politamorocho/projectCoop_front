import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { VerTurnosComponent } from './ver-turnos/ver-turnos.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerTurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    SharedModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TitleCasePipe
  ]
})
export class TurnosModule { }
