import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPracticeFileComponent } from './upload-practice-file/upload-practice-file.component';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'upload-practice-file',
    component: UploadPracticeFileComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFilesRoutingModule { }
