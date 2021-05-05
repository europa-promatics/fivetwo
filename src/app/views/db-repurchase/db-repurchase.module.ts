import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { DbRepurchaseRoutingModule } from './db-repurchase-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DbRepurchaseRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DbRepurchaseModule { }
