import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/security/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceConfig } from '../config/service.config';
import { UserRegisterModel } from '../models/user-register.model';
import { ResetPasswordModel } from '../models/security/reset-password.model';
import { ChangePasswordModel } from '../models/security/change-password.model';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<UserModel>(new UserModel());

  constructor(
    private http: HttpClient
  ) {
    this.verifyActiveSession();
  }

  verifyActiveSession() {
    let currentSession = this.getSession();
    if (currentSession) {
      let userData = JSON.parse(currentSession);
      this.setUserData(userData);
    }
  }

  setUserData(value: UserModel) {
    this.userData.next(value);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  /**
   * Verify credentials of an user to login
   * @param model Data to verify credentials
   */
  LoginUser(model: UserModel): Observable<UserRegisterModel> {
    return this.http.post<UserRegisterModel>(`${ServiceConfig.BASE_URL}auth/login`, model, {
      headers: new HttpHeaders({
      })
    })
  }

  ResetPassword(model: ResetPasswordModel): Observable<Boolean> {
    return this.http.post<Boolean>(`${ServiceConfig.BASE_URL}auth/forgot-password`, model, {
      headers: new HttpHeaders({
      })
    })
  }

  ChangePassword(model: ChangePasswordModel): Observable<Boolean> {
    return this.http.post<Boolean>(`${ServiceConfig.BASE_URL}auth/reset-password`, model, {
      headers: new HttpHeaders({
      })
    })
  }

  /**
   * Save data of new session
   * @param sessionData Object with user in session data
   */
  saveSession(sessionData: any): Boolean {
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      return false;
    } else {
      sessionData.isLogged = true;
      let data: UserModel = {
        username: sessionData.user.username,
        token: sessionData.access_token,
        isLogged: true,
        id: sessionData.user.id,
        name: sessionData.user.name,
        role: sessionData.user.role
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true;
    }
  }

  getSession() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  /**
   * Verify if a session is active
   */
  sessionExists(): Boolean {
    return (this.getSession()) ? true : false;
  }

  /**
   * Verify if the user in session has the roleId parameter
   * @param roleId role to verify
   */
  isUserRol(roleId: string): Boolean {
    let currentSession = this.getSession() ?? "";
    return JSON.parse(currentSession).role == roleId;
  }

  /**
   * Return the token string
   */
  getToken(): String {
    let currentSession = this.getSession() ?? "";
    return JSON.parse(currentSession).token;
  }

  getUserId(): String {
    let currentSession = this.getSession() ?? "";
    return JSON.parse(currentSession).id;
  }


  /**
   * close the current session
   */
  Logout() {
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }

}
