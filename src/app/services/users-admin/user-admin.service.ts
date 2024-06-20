import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SecurityService } from '../security.service';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../../config/service.config';
import { UserAdminModel } from '../../models/users-admin/user-admin-model';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  entity: String = 'users';
  token: String;

  constructor(private http: HttpClient,
    private securityService: SecurityService) {
    this.token = this.securityService.getToken();
  }

  /**
   * Get all records of course collection
   */
  getAllRecords(): Observable<UserAdminModel[]> {
    return this.http.get<UserAdminModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/all`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  getRecordByUsername(username: string): Observable<UserAdminModel> {
    return this.http.get<UserAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
      params: new HttpParams().set('email', username)
    });
  }

  saveNewRecord(record: UserAdminModel): Observable<UserAdminModel> {
    return this.http.post<UserAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record: UserAdminModel): Observable<UserAdminModel> {
    return this.http.patch<UserAdminModel>(`${ServiceConfig.BASE_URL}${this.entity}/${record.id}`, record, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  removeRecord(recordId: number): Observable<any> {
    return this.http.delete<any>(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
}
