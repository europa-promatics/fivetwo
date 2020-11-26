import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceOfficerLoginRoutingModule } from './compliance-officer-login-routing.module';
import { ComplianceOfficerLoginComponent } from './compliance-officer-login.component';


@NgModule({
  declarations: [ ComplianceOfficerLoginComponent ],
  imports: [
    CommonModule,
    ComplianceOfficerLoginRoutingModule
  ]
})
export class ComplianceOfficerLoginModule { }
