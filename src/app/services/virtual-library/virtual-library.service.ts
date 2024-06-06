import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../security.service';
import { Observable } from 'rxjs';
import { VirtualLibraryModel } from '../../models/virtual-library/virtual-library.model';
import { ServiceConfig } from '../../config/service.config';

@Injectable({
  providedIn: 'root'
})
export class VirtualLibraryService {
  entity: String = 'url-repository';

  constructor(private http: HttpClient,
    private securityService: SecurityService) {
  }

   /**
   * Get all records of course collection
   */
   getAllRecords(): Observable<VirtualLibraryModel[]> {
    return this.http.get<VirtualLibraryModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`);
  }
}
