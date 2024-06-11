import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PracticePostulationRoutingModule } from './practice-postulation-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PracticePostulationRoutingModule
  ],
  providers : [DatePipe]
})
export class PracticePostulationModule { }
