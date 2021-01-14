import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbBrokerAppointmentComponent } from './db-broker-appointment.component';


const routes: Routes = [{
	path: '',
	component: DbBrokerAppointmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbBrokerAppointmentRoutingModule { }
