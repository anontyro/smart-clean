import { LocationModel } from './../../../../models/database/location.model';
import { DeviceModel } from './../../../../models/database/device.model';
import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from '../../../../../node_modules/rxjs/operators';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit, OnDestroy {

  public deviceList: Array<DeviceModel> = [];
  public locationList: Array<LocationModel> = [];
  public location: LocationModel;

  private keepAlive = true;
  private locationId;

  constructor(
    private apiService: ApiHandlerService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.apiService.getDeviceList()
      .pipe(takeWhile(() => this.keepAlive ))
      .subscribe(list => this.deviceList = list.deviceList);
    this.setup();
  }

  private setup() {
    this.route.params
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(params => {
        this.locationId = params['id'];
      });

    this.apiService.getLocationList()
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(list => {
        console.log(list);
        this.locationList = list.locationList;
        this.location = this.getLocation(this.locationId);
      });
  }

  private getLocation(id) {
    for (let i = 0; i < this.locationList.length; i++) {
      if (this.locationList[i]._id === id) {
        return this.locationList[i];
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }

}
