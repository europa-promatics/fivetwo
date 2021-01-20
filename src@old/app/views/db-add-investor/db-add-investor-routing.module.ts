import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbAddInvestorComponent } from './db-add-investor.component';

const routes: Routes = [{
	path: '',
	component: DbAddInvestorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbAddInvestorRoutingModule { }
