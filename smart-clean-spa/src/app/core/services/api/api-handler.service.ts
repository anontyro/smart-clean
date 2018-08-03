import { GlobalVars } from './../../../../data/globalVars';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from '../../../../../node_modules/rxjs';

/**
 * @class API Handler
 * Main api service allowing the app to interact with the server side
 * All get put post delete requests go through here
 */
@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  // URI base root to api
  private apiUri = GlobalVars.apiUri;

  // CACHED data lists that are used to prevent extra calls to the server and speed up the frontend
  private cachedProjectList: any = new ReplaySubject(1);
  private cachedLocationList: any = new ReplaySubject(1);
  private cachedDeviceList: any = new ReplaySubject(1);

  /** Standard constructor that requires HTTPClient and AuthService for token header creation */
  constructor(private http: HttpClient, private authService: AuthService) { this.onInIt(); }

  private onInIt() {
  }

  /**
   * Gets the initial list of projects for the user this list only contains the basic data to provide a starting point
   * it skips the indepth data to allow quicker load speeds with large amounts of data
   * @param forceRefresh optional boolean param to force server to get new data
   */
  public getProjectList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.project.get.projectList;

    if (!this.cachedProjectList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedProjectList.next(results));
    }
    return this.cachedProjectList;
  }

  /**
   * Gets the list of all locations that have the current user id in them, this is to make it easy for them to see
   * avaliable locations along with providing an easy list to use for select lists
   * @param forceRefresh optional boolean param to force server to get new data
   */
  public getLocationList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.location.get.locationListByUser;

    if (!this.cachedLocationList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedLocationList.next(results));
    }
    return this.cachedLocationList;
  }

  /**
   * Gets a list of all the devices that this user owns. This is helpful to provide a basic list of all they have
   * it also provides a good point for select lists that will be used in assignment
   * @param forceRefresh optional boolean param to force server to get new data
   */
  public getDeviceList(forceRefresh?: boolean) {
    const url = this.apiUri + GlobalVars.device.get.deviceListByUser;

    if (!this.cachedDeviceList.observers.length || forceRefresh) {
      this.createGetRequest(url).subscribe(results => this.cachedDeviceList.next(results));
    }
    return this.cachedDeviceList;
  }

  /**
   * This method requires the project _id from the database but will return the full object
   * containing two levels of embedded data in location and devices
   * this is the complete project information
   * @param projectId ubique _id for the item from the database
   */
  public getProjectDetail(projectId: string) {
    const url = this.apiUri + GlobalVars.project.get.completeProject + '/' + projectId;

    return this.createGetRequest(url);
  }

  /**
   * Post a new project object to the database
   * @param project base level project item using refs for locations
   */
  public postNewProject(project) {
    const url = this.apiUri + GlobalVars.project.post.createProject;

    return this.createPostRequest(url, project);
  }

  /**
   * Post a new location to the database base level location
   * @param location base level location object
   */
  public postNewLocation(location) {
    const url = this.apiUri + GlobalVars.location.post.createLocation;

    return this.createPostRequest(url, location);
  }

  /**
   * Post a new device object to the database
   * @param device device item that maps to the database device
   */
  public postNewDeviceList(device) {
    const url = this.apiUri + GlobalVars.device.post.createDevice;

    return this.createPostRequest(url, device);
  }

  /**
   * Update method for the project object to update this table in the database
   * @param project base project object
   */
  public putProjectUpdate(project) {
    const url = this.apiUri + GlobalVars.project.put.updateProject;

    return this.createPutRequest(url, project);
  }

  /**
   * Update method for the project object to update this table in hte database
   * @param location base location object
   */
  public putLocationUpdate(location) {
    const url = this.apiUri + GlobalVars.location.put.updateLocation;

    return this.createPutRequest(url, location);
  }

  /**
   * Update method for the device to update this item in the table
   * @param device base device object
   */
  public putDeviceUpdate(device) {
    const url = this.apiUri + GlobalVars.device.put.updateDevice;

    return this.createPutRequest(url, location);
  }

  public detachDevice(device) {
    const url = this.apiUri + GlobalVars.device.patch.detachDevice;

    return this.createPatchRequest(url, device);
  }


  // PRIVATE METHODS ---------------------------------------------------------

  private createGetRequest(url: string): Observable<any> {
    return this.http.get<Array<any>>(url, this.authService.getAuthHeader());
  }

  private createPostRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.authService.getAuthHeader());
  }

  private createPutRequest(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.authService.getAuthHeader());
  }

  private createPatchRequest(url: string, body: any): Observable<any> {
    return this.http.patch(url, body, this.authService.getAuthHeader());
  }

}
