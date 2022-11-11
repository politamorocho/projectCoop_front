import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LogueoComponent } from './logueo/logueo.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';


@NgModule({
  declarations: [
    LogueoComponent,
    RecuperarCuentaComponent,
    NuevoPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ]
})
export class LoginModule { }
