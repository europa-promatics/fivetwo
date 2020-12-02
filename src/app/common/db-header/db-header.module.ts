import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbHeaderRoutingModule } from './db-header-routing.module';
import { DbHeaderComponent } from './db-header.component';

@NgModule({
  declarations: [DbHeaderComponent],
  imports: [
    CommonModule,
    DbHeaderRoutingModule
  ]
})
export class DbHeaderModule { }
