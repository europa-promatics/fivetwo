import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbInvestmentsComponent } from './db-investments.component';


const routes: Routes = [{
	path: '',
	component: DbInvestmentsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbInvestmentsRoutingModule { }
