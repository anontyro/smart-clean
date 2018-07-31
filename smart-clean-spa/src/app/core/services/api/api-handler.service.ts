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
    // this.getProjectList().subscribe(results => console.log(results));
  }

  public getProjectList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.project.get.projectList;

    if (!this.cachedProjectList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedProjectList.next(results));
    }
    return this.cachedProjectList;
  }

  public getLocationList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.location.get.locationListByUser;

  }

  public getDeviceList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.device.get.deviceListByUser;

  }

  public getProjectDetail(projectId: string) {
    const url = this.apiUri + GlobalVars.project.get.completeProject;

  }

  public postNewProject() {
    const url = this.apiUri + GlobalVars.project.post.createProject;

  }

  public postNewLocation() {
    const url = this.apiUri + GlobalVars.location.post.createLocation;

  }

  public postNewDeviceList() {
    const url = this.apiUri + GlobalVars.device.post.createDevice;

  }

  public putProjectUpdate() {
    const url = this.apiUri + GlobalVars.project.put.updateProject;

  }

  public putLocationUpdate() {
    const url = this.apiUri + GlobalVars.location.put.updateLocation;

  }

  public putDeviceUpdate() {
    const url = this.apiUri + GlobalVars.device.put.updateDevice;

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
