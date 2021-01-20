import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbTasksRoutingModule } from './db-tasks-routing.module';
import { DbTasksComponent } from './db-tasks.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ DbTasksComponent ],
  imports: [
    CommonModule,
    DbTasksRoutingModule
  ]
})
export class DbTasksModule { }
