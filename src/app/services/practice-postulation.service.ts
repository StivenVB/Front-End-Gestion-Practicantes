import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PracticePostulationModel } from '../models/practice-postulation.model';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class PracticePostulationService {

  constructor(private http: HttpClient, private secService: SecurityService) { }

  SavePracticePostulation(model: PracticePostulationModel): Observable<PracticePostulationModel> {
    return this.http.post<PracticePostulationModel>(`${ServiceConfig.BASE_URL}practice-postulation`, model, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.secService.getToken()}`
      })
    });
  }

  GetPracticePostulationsByUser(): Observable<PracticePostulationModel[]> {
    return this.http.get<PracticePostulationModel[]>(`${ServiceConfig.BASE_URL}practice-postulation/user/${this.secService.getUserId()}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.secService.getToken()}`
      })
    });
  }

}
