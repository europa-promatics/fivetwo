import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbInstructionsComponent } from './db-instructions.component';


const routes: Routes = [{
	path: '',
	component: DbInstructionsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbInstructionsRoutingModule { }
