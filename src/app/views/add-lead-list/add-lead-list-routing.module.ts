import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLeadListComponent } from './add-lead-list.component';

const routes: Routes = [{
	path: '',
	component: AddLeadListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLeadListRoutingModule { }
