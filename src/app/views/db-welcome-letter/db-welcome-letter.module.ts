import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbWelcomeLetterRoutingModule } from './db-welcome-letter-routing.module';
import { DbWelcomeLetterComponent } from './db-welcome-letter.component';

@NgModule({
  declarations: [ DbWelcomeLetterComponent ],
  imports: [
    CommonModule,
    DbWelcomeLetterRoutingModule
  ]
})
export class DbWelcomeLetterModule { }
