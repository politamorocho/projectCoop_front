import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { PagReportesComponent } from './pag-reportes/pag-reportes.component';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    PagReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    DataTablesModule
    
  ]
})
export class ReportesModule { }
