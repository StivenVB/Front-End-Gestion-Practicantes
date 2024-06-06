import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeOfferListAdminComponent } from './practice-offer-list-admin/practice-offer-list-admin.component';
import { PracticeOfferCreationAdminComponent } from './practice-offer-creation-admin/practice-offer-creation-admin.component';
import { PracticeOfferEditionAdminComponent } from './practice-offer-edition-admin/practice-offer-edition-admin.component';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'list',
    component: PracticeOfferListAdminComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'creation',
    component: PracticeOfferCreationAdminComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'edition/:id',
    component: PracticeOfferEditionAdminComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeOfferAdminRoutingModule { }
