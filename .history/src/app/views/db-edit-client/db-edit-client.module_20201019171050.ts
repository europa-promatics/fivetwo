import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbEditClientRoutingModule } from './db-edit-client-routing.module';
import { DbEditClientComponent } from './db-edit-client.component';

@NgModule({
  declarations: [DbEditClientComponent],
  imports: [
    CommonModule,
    DbEditClientRoutingModule
  ]
})
export class DbEditClientModule { }
