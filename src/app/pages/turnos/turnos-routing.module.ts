import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerTurnosComponent } from './ver-turnos/ver-turnos.component';

const routes: Routes = [
  {
    path:'ver_turnos', component: VerTurnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
