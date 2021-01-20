import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbDocumentsRoutingModule } from './db-documents-routing.module';
import { DbDocumentsComponent } from './db-documents.component';


@NgModule({
  declarations: [DbDocumentsComponent],
  imports: [
    CommonModule,
    DbDocumentsRoutingModule
  ]
})
export class DbDocumentsModule { }
