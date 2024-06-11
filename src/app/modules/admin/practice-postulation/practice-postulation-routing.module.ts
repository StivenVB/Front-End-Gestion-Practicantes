import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticePostulationListComponent } from './practice-postulation-list/practice-postulation-list.component';
import { AuthenticatedGuard } from '../../../guards/authenticated.guard';
import { AuthenticatedAdminGuard } from '../../../guards/authenticated-admin.guard';

const routes: Routes = [
  {
    path: 'list',
    component: PracticePostulationListComponent,
    canActivate: [AuthenticatedAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticePostulationRoutingModule { }
