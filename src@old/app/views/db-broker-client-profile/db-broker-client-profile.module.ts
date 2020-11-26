import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbBrokerClientProfileRoutingModule } from './db-broker-client-profile-routing.module';
import { DbBrokerClientProfileComponent } from './db-broker-client-profile.component';

@NgModule({
  declarations: [ DbBrokerClientProfileComponent ],
  imports: [
    CommonModule,
    DbBrokerClientProfileRoutingModule
  ]
})
export class DbBrokerClientProfileModule { }
