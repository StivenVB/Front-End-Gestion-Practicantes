import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PracticeOfferModel } from '../models/practice-offer.model';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';

@Injectable({
  providedIn: 'root'
})
export class ParacticeOfferService {

  constructor(private http: HttpClient) { }

  GetPracticeOfferList(): Observable<PracticeOfferModel[]> {
    return this.http.get<PracticeOfferModel[]>(`${ServiceConfig.BASE_URL}practice-offer`);
  }
}
