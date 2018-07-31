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
    const url = this.apiUri + GlobalVars.project.get.projectList;

    if (!this.cachedProjectList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedProjectList.next(results));
    }
    return this.cachedProjectList;
  }

  public getLocationList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.location.get.locationListByUser;

    if (!this.cachedLocationList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedLocationList.next(results));
    }
    return this.cachedLocationList;
  }

  public getDeviceList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.device.get.deviceListByUser;

    if (!this.cachedDeviceList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedDeviceList.next(results));
    }
    return this.cachedDeviceList;
  }

  public getProjectDetail(projectId: string) {
    const url = this.apiUri + GlobalVars.project.get.completeProject + '/' + projectId;

    return this.createGetRequest(url);
  }

  public postNewProject(project) {
    const url = this.apiUri + GlobalVars.project.post.createProject;

    return this.createPostRequest(url, project);
  }

  public postNewLocation(location) {
    const url = this.apiUri + GlobalVars.location.post.createLocation;

    return this.createPostRequest(url, location);
  }

  public postNewDeviceList(device) {
    const url = this.apiUri + GlobalVars.device.post.createDevice;

    return this.createPostRequest(url, device);
  }

  public putProjectUpdate(project) {
    const url = this.apiUri + GlobalVars.project.put.updateProject;

    return this.createPutRequest(url, project);
  }

  public putLocationUpdate(location) {
    const url = this.apiUri + GlobalVars.location.put.updateLocation;

    return this.createPutRequest(url, location);
  }

  public putDeviceUpdate(device) {
    const url = this.apiUri + GlobalVars.device.put.updateDevice;

    return this.createPutRequest(url, location);
  }



  private createGetRequest(url: string): Observable<any> {
    return this.http.get<Array<any>>(url, this.authService.getAuthHeader());
  }

  private createPostRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.authService.getAuthHeader());
  }

  private createPutRequest(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.authService.getAuthHeader());
  }

}
