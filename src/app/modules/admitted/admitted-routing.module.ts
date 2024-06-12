import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmittedListComponent } from './admitted-list/admitted-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AdmittedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmittedRoutingModule { }
