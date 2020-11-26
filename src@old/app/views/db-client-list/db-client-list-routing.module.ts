import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbClientListComponent } from './db-client-list.component';

const routes: Routes = [{
	path: '',
	component: DbClientListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbClientListRoutingModule { }
