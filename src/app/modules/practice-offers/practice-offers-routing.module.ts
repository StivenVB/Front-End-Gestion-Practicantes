import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeOffersListComponent } from './practice-offers-list/practice-offers-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: PracticeOffersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeOffersRoutingModule { }
