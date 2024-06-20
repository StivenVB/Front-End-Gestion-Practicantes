import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../../config/service.config';
import { AdmittedModel } from '../../models/admitted/admitted.model';

@Injectable({
  providedIn: 'root'
})
export class AdmittedService {
  entity: String = 'practice-offer/offers/details';

  constructor(private http: HttpClient) {
  }

   /**
   * Get all records of course collection
   */
   getAllRecords(): Observable<AdmittedModel[]> {
    return this.http.get<AdmittedModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }
}
