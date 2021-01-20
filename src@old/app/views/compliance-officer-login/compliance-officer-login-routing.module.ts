import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplianceOfficerLoginComponent } from './compliance-officer-login.component';

const routes: Routes = [{
	path: '',
	component: ComplianceOfficerLoginComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceOfficerLoginRoutingModule { }
