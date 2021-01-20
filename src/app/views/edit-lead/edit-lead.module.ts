import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditLeadRoutingModule } from './edit-lead-routing.module';
import { EditLeadComponent } from './edit-lead.component';


@NgModule({
  declarations: [EditLeadComponent],
  imports: [
    CommonModule,
    EditLeadRoutingModule
  ]
})
export class EditLeadModule { }
