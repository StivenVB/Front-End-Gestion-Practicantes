import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../security.service';
import { Observable } from 'rxjs';
import { PracticeOfferAdminModel } from '../../models/practice-offer-admin/practice-offer-admin.model';
import { ServiceConfig } from '../../config/service.config';

@Injectable({
  providedIn: 'root'
})
export class PracticeOfferAdminService {
  entity: String = 'practice-offer';
  token: String;

  constructor(private http: HttpClient,
    private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }

  /**
   * Get all records of course collection
   */
  getAllRecords(): Observable<PracticeOfferAdminModel[]> {
    return this.http.get<PracticeOfferAdminModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }

  getRecordById(recordId: String): Observable<PracticeOfferAdminModel> {
    return this.http.get<PracticeOfferAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`);
  }

  saveNewRecord(record: PracticeOfferAdminModel): Observable<PracticeOfferAdminModel> {
    return this.http.post<PracticeOfferAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record: PracticeOfferAdminModel): Observable<PracticeOfferAdminModel> {
    return this.http.patch<PracticeOfferAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  removeRecord(recordId: String): Observable<any> {
    return this.http.delete<any>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

}