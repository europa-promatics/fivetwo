import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbSidebarComponent } from './db-sidebar.component';

const routes: Routes = [{
	path: '',
	component: DbSidebarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbSidebarRoutingModule { }
