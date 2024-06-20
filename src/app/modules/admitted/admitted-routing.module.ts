import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmittedListComponent } from './admitted-list/admitted-list.component';
import { AdmittedDashboardComponent } from './admitted-dashboard/admitted-dashboard.component';
import { AuthenticatedAdminGuard } from '../../guards/authenticated-admin.guard';

const routes: Routes = [
  {
    path: 'list',
    component: AdmittedListComponent
  },
  {
    path: 'dashboard',
    component: AdmittedDashboardComponent,
    canActivate: [AuthenticatedAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmittedRoutingModule { }
