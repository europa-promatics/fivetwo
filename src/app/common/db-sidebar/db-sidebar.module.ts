import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbSidebarRoutingModule } from './db-sidebar-routing.module';
import { DbSidebarComponent } from './db-sidebar.component';

import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [DbSidebarComponent],
  imports: [
    CommonModule,
    DbSidebarRoutingModule,
    MatExpansionModule
  ]
})
export class DbSidebarModule { }
