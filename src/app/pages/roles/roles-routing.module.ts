import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerRolesComponent } from './ver-roles/ver-roles.component';

const routes: Routes = [
  {
    path:"ver_roles", component: VerRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
