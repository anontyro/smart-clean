import { DeviceModel } from './../../../../models/database/device.model';
import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationModel } from '../../../../models/database/location.model';
import { takeWhile } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit, OnDestroy {

  public deviceList: Array<DeviceModel> = [];

  private keepAlive = true;

  constructor(private apiService: ApiHandlerService) { }


  ngOnInit() {
    this.apiService.getDeviceList()
      .pipe(takeWhile(() => this.keepAlive ))
      .subscribe(list => this.deviceList = list.deviceList);
  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }

}
