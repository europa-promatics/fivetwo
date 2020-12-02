import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbBrokerDetailRoutingModule } from './db-broker-detail-routing.module';
import { DbBrokerDetailComponent } from './db-broker-detail.component';

@NgModule({
  declarations: [ DbBrokerDetailComponent ],
  imports: [
    CommonModule,
    DbBrokerDetailRoutingModule
  ]
})
export class DbBrokerDetailModule { }
