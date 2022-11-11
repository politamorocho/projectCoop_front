import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { VerRutasComponent } from './ver-rutas/ver-rutas.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerRutasComponent
  ],
  imports: [
    CommonModule,
    RutasRoutingModule,
    SharedModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RutasModule { }
