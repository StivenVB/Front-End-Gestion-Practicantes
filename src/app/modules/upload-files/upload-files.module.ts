import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UploadFilesRoutingModule } from './upload-files-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UploadFilesRoutingModule
  ],
  providers : [DatePipe]
})
export class UploadFilesModule { }
