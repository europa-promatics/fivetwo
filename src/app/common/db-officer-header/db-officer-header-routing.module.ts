import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbOfficerHeaderComponent } from './db-officer-header.component';

const routes: Routes = [{
	path: '',
	component: DbOfficerHeaderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbOfficerHeaderRoutingModule { }
