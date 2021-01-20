import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbBrokerDetailComponent } from './db-broker-detail.component';

const routes: Routes = [{
	path: '',
	component: DbBrokerDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbBrokerDetailRoutingModule { }
