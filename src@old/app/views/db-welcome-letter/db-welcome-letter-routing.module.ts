import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbWelcomeLetterComponent } from './db-welcome-letter.component';


const routes: Routes = [{
	path: '',
	component: DbWelcomeLetterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbWelcomeLetterRoutingModule { }
