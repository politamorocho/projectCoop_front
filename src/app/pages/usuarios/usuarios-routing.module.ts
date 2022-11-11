import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';

const routes: Routes = [
  {
    path:"ver_usuarios", component:VerUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
