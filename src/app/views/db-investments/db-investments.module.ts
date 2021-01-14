import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu'; 
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DbInvestmentsRoutingModule } from './db-investments-routing.module';
import { DbInvestmentsComponent } from './db-investments.component';


@NgModule({
  declarations: [ DbInvestmentsComponent ],
  imports: [
    CommonModule,
    DbInvestmentsRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatMenuModule,
    // NgbModule
  ]
})
export class DbInvestmentsModule { }
