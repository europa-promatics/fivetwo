import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbBrokerClientProfileComponent } from './db-broker-client-profile.component';

const routes: Routes = [{
	path: '',
	component: DbBrokerClientProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbBrokerClientProfileRoutingModule { }
