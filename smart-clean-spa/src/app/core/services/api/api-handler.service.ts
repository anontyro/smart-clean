import { GlobalVars } from './../../../../data/globalVars';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  private apiUri = GlobalVars.apiUri;

  private cachedProjectList: any = new ReplaySubject(1);
  private cachedLocationList: any = new ReplaySubject(1);
  private cachedDeviceList: any = new ReplaySubject(1);

  constructor(private http: HttpClient, private authService: AuthService) { this.onInIt(); }

  private onInIt() {

  }

  public getProjectList(forceRefresh?: boolean) {

  }

  public getLocationList(forceRefresh?: boolean) {

  }

  public getUserLocations(forceRefresh?: boolean) {

  }

  public getDeviceList(forceRefresh?: boolean) {

  }

  public getProjectDetail(projectId: string) {

  }

  public postNewProject() {

  }

  public postNewLocation() {

  }

  public postNewDeviceList() {

  }

  public putProjectUpdate() {

  }

  public putLocationUpdate() {

  }

  public putDeviceUpdate() {

  }



  private createGetRequest(url: string): Observable<any> {
    return this.http.get<Array<any>>(url, this.authService.getAuthHeader());
  }

  private createPostRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.authService.getAuthHeader());
  }

  private putRequest(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.authService.getAuthHeader());
  }

}
