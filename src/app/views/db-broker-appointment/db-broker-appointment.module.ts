import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbBrokerAppointmentRoutingModule } from './db-broker-appointment-routing.module';
import { DbBrokerAppointmentComponent } from './db-broker-appointment.component';

@NgModule({
  declarations: [ DbBrokerAppointmentComponent ],
  imports: [
    CommonModule,
    DbBrokerAppointmentRoutingModule
  ]
})
export class DbBrokerAppointmentModule { }
