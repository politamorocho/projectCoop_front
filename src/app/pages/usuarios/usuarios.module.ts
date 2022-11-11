import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate.pipe';


@NgModule({
  declarations: [
    VerUsuariosComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule 
  ], providers:[
    TranslatePipe
  ]
})
export class UsuariosModule { }
