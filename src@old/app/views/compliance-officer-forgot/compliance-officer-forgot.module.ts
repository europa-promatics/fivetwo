import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceOfficerForgotRoutingModule } from './compliance-officer-forgot-routing.module';
import { ComplianceOfficerForgotComponent } from './compliance-officer-forgot.component';

@NgModule({
  declarations: [ ComplianceOfficerForgotComponent ],
  imports: [
    CommonModule,
    ComplianceOfficerForgotRoutingModule
  ]
})
export class ComplianceOfficerForgotModule { }
