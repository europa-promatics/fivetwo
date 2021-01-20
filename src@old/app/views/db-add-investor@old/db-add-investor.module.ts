import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DbAddInvestorRoutingModule } from './db-add-investor-routing.module';
import { DbAddInvestorComponent } from './db-add-investor.component';

import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [ DbAddInvestorComponent ],
  imports: [
    CommonModule,
    DbAddInvestorRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DbAddInvestorModule { }
