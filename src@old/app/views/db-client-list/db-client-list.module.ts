import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbClientListRoutingModule } from './db-client-list-routing.module';
import { DbClientListComponent } from './db-client-list.component';


@NgModule({
  declarations: [ DbClientListComponent ],
  imports: [
    CommonModule,
    DbClientListRoutingModule
  ]
})
export class DbClientListModule { }
