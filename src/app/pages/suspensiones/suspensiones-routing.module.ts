import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerSuspensionComponent } from './ver-suspension/ver-suspension.component';


const routes: Routes = [
  {
    path:'ver_suspension', component: VerSuspensionComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspensionesRoutingModule { }
