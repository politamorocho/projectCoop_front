import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerUnidadComponent } from './ver-unidad/ver-unidad.component';

const routes: Routes = [
  {
    path:'ver_unidades', component:VerUnidadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadRoutingModule { }
