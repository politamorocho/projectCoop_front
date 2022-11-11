import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerRutasComponent } from './ver-rutas/ver-rutas.component';

const routes: Routes = [
  {
    path:"ver_rutas", component: VerRutasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
