import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { DbLeadListRoutingModule } from './db-lead-list-routing.module';
import { DbLeadListComponent } from './db-lead-list.component'


@NgModule({
  declarations: [DbLeadListComponent],
  imports: [
    CommonModule,
    DbLeadListRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DbLeadListModule { }
