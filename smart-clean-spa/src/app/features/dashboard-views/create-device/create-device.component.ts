import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { takeWhile } from '../../../../../node_modules/rxjs/operators';
import { DeviceModel } from '../../../../models/database/device.model';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit, OnDestroy {

  public deviceList: Array<DeviceModel> = [];
  public device: DeviceModel;

  private keepAlive = true;
  private deviceId: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiHandlerService
  ) { }

  ngOnInit() {
    this.setup();
  }

  private setup() {
    this.route.params
    .pipe(takeWhile(() => this.keepAlive))
    .subscribe(params => {
      this.deviceId = params['id'];
    });

    this.apiService.getDeviceList()
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(list => {
        this.deviceList = list.deviceList;
        this.device = this.getDevice(this.deviceId);
      });
  }

  private getDevice(id) {
    console.log(this.deviceList);
    for (let i = 0; i < this.deviceList.length; i++) {
      console.log(this.deviceList[i]);
      if (this.deviceList[i]._id === id) {
        return this.deviceList[i];
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }

}
