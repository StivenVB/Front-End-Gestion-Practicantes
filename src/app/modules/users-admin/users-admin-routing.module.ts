import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListAdminComponent } from './user-list-admin/user-list-admin.component';
import { AuthenticatedAdminGuard } from '../../guards/authenticated-admin.guard';
import { UserCreationAdminComponent } from './user-creation-admin/user-creation-admin.component';
import { UserEditionAdminComponent } from './user-edition-admin/user-edition-admin.component';

const routes: Routes = [
  {
    path: 'list',
    component: UserListAdminComponent,
    canActivate: [AuthenticatedAdminGuard]
  },
  {
    path: 'creation',
    component: UserCreationAdminComponent,
    canActivate: [AuthenticatedAdminGuard]
  },
  {
    path: 'edition/:id/:username',
    component: UserEditionAdminComponent,
    canActivate: [AuthenticatedAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAdminRoutingModule { }
