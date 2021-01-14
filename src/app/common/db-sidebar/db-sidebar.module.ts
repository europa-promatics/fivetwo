import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbSidebarRoutingModule } from './db-sidebar-routing.module';
import { DbSidebarComponent } from './db-sidebar.component';


@NgModule({
  declarations: [DbSidebarComponent],
  imports: [
    CommonModule,
    DbSidebarRoutingModule
  ]
})
export class DbSidebarModule { }
