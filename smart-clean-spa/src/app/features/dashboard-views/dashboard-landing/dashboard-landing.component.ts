import { takeWhile } from 'rxjs/operators';
import { ProjectModel } from './../../../../models/database/project.model';
import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationModel } from '../../../../models/database/location.model';
import { DeviceModel } from '../../../../models/database/device.model';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit, OnDestroy {

  public projectList: Array<ProjectModel> = [];
  public locationList: Array<LocationModel> = [];
  public deviceList: Array<DeviceModel> = [];

  private keepAlive = true;

  constructor(
    private apiHandlerService: ApiHandlerService
  ) { }

  ngOnInit() {
    this.buildLists();
  }

  private buildLists() {
    this.apiHandlerService.getProjectList()
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => this.projectList = response.projectList);

    this.apiHandlerService.getLocationList()
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => this.locationList = response.locationList);

    this.apiHandlerService.getDeviceList()
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => this.deviceList = response.deviceList);
  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }
}
