import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker'; 

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatDatepickerModule,
  ]
})
export class DashboardModule { }
