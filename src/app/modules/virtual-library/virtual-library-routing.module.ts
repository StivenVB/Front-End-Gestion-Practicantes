import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from '../../guards/unauthentication.guard';
import { VirtualLibraryListComponent } from './virtual-library-list/virtual-library-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: VirtualLibraryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualLibraryRoutingModule { }
