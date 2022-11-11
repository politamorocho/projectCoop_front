import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SuspensionesRoutingModule } from './suspensiones-routing.module';
import { VerSuspensionComponent } from './ver-suspension/ver-suspension.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VerSuspensionComponent,

  ],
  imports: [
    CommonModule,
    SuspensionesRoutingModule,
    FormsModule,
    MDBBootstrapModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class SuspensionesModule { }
