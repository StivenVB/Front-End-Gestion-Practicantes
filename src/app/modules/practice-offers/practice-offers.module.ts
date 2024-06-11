import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeOffersRoutingModule } from './practice-offers-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PracticeOffersRoutingModule,
    NgxPaginationModule
  ]
})
export class PracticeOffersModule { }
