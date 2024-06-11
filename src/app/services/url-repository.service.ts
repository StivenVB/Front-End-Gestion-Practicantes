import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlRepositoryModel } from '../models/url-repository.model';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class UrlRepositoryService {

  constructor(private http: HttpClient, private secService: SecurityService) { }

  UploadFile(formData: FormData): Observable<UrlRepositoryModel> {
    return this.http.post<UrlRepositoryModel>(`${ServiceConfig.BASE_URL}url-repository/upload`, formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.secService.getToken()}`
      })
    });
  }
}
