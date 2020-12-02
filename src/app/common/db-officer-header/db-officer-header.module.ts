import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbOfficerHeaderRoutingModule } from './db-officer-header-routing.module';
import { DbOfficerHeaderComponent } from './db-officer-header.component';


@NgModule({
  declarations: [ DbOfficerHeaderComponent ],
  imports: [
    CommonModule,
    DbOfficerHeaderRoutingModule
  ]
})
export class DbOfficerHeaderModule { }
