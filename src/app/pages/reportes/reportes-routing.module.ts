import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagReportesComponent } from './pag-reportes/pag-reportes.component';

const routes: Routes = [

  {
    path:'pag_reportes', component: PagReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
