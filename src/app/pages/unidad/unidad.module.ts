import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadRoutingModule } from './unidad-routing.module';
import { VerUnidadComponent } from './ver-unidad/ver-unidad.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslatePipe } from '../../translate.pipe';



@NgModule({
  declarations: [
    VerUnidadComponent,
  ],
  imports: [
    CommonModule,
    UnidadRoutingModule,
    SharedModule,
    FormsModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    
  ],
  providers:[
    TranslatePipe
  ]
})
export class UnidadModule { }
