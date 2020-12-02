import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbInstructionsRoutingModule } from './db-instructions-routing.module';
import { DbInstructionsComponent } from './db-instructions.component';

import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ DbInstructionsComponent ],
  imports: [
    CommonModule,
    DbInstructionsRoutingModule,
    MatMenuModule,
	MatButtonModule,
	MatIconModule,
  ]
})
export class DbInstructionsModule { }
