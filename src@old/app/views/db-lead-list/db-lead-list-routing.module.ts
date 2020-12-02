import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbLeadListComponent } from './db-lead-list.component';

const routes: Routes = [{
	path: '',
	component: DbLeadListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbLeadListRoutingModule { }
