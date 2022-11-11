import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { VerRolesComponent } from './ver-roles/ver-roles.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    MDBBootstrapModule,
    FormsModule,
    // UsuariosModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
