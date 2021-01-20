import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbClientProfileRoutingModule } from './db-client-profile-routing.module';
import { DbClientProfileComponent } from './db-client-profile.component';

@NgModule({
  declarations: [ DbClientProfileComponent ],
  imports: [
    CommonModule,
    DbClientProfileRoutingModule
  ]
})
export class DbClientProfileModule { }
