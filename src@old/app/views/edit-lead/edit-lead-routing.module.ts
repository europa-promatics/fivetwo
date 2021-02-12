import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLeadComponent } from './edit-lead.component';


const routes: Routes = [{
  path: '',
  component: EditLeadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditLeadRoutingModule { }
