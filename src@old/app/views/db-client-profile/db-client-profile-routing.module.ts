import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbClientProfileComponent } from './db-client-profile.component';

const routes: Routes = [{
	path: '',
	component: DbClientProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbClientProfileRoutingModule { }
