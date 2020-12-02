import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplianceOfficerForgotComponent } from './compliance-officer-forgot.component';

const routes: Routes = [{
	path : '',
	component: ComplianceOfficerForgotComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceOfficerForgotRoutingModule { }
