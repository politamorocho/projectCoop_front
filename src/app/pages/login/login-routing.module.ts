import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueoComponent } from './logueo/logueo.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';

const routes: Routes = [
  {
    path:'login', component: LogueoComponent
  },
  {
    path:'recuperar', component: RecuperarCuentaComponent
  },
  {
    path:'nuevo_password', component: NuevoPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
