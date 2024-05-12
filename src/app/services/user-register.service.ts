import { Injectable } from '@angular/core';
import { UserRegisterModel } from '../models/user-register.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service.config';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  entity: String = 'users';

  constructor(
    private http: HttpClient
  ) { }

  UserRegister(model: UserRegisterModel): Observable<UserRegisterModel> {
    return this.http.post<UserRegisterModel>(`${ServiceConfig.BASE_URL}${this.entity}`, model, {})
  }

}
