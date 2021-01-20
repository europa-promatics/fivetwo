import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbTasksComponent } from './db-tasks.component';

const routes: Routes = [{
	path: '',
	component: DbTasksComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbTasksRoutingModule { }
