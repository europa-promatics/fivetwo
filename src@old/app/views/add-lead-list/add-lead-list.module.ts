import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

import { AddLeadListRoutingModule } from './add-lead-list-routing.module';
import { AddLeadListComponent } from './add-lead-list.component';

@NgModule({
  declarations: [ AddLeadListComponent ],
  imports: [
    CommonModule,
    AddLeadListRoutingModule,
    MatRadioModule
  ]
})
export class AddLeadListModule { }
