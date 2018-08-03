import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DeviceModel } from '../../../../../models/database/device.model';
import { LocationModel } from '../../../../../models/database/location.model';
import { LoginHandlerService } from '../../../../core/services/auth/login-handler.service';
import { ApiHandlerService } from '../../../../core/services/api/api-handler.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  @Input()
  public location: LocationModel;

  @Input()
  public deviceList: Array<DeviceModel> = [];

  public selectedDevice = '';

  public isLoading = false;

  constructor(
    private loginService: LoginHandlerService,
    private apiService: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLocation();
  }

  private checkLocation() {
    if (this.location) {
      return;
    }
    const loc: LocationModel = {
      deviceId: [],
      id: '',
      display_name: '',
    };
    this.location = loc;
  }

  public avaliableDevices() {
    const avaliable = [];

    if (this.deviceList) {
      this.deviceList.forEach(device => {
        if (!device.locationId) {
          avaliable.push(device);
        }
      });
    }

    return avaliable;
  }

  public addDevice() {
    const list = this.location.deviceId;

    if (!this.selectedDevice) {
      return;
    }
    for (let i = 0; i < list.length; i++) {
      if (this.selectedDevice === list[i]) {
        return this.selectedDevice = '';
      }
    }
    this.location.deviceId.push(this.selectedDevice);
    return this.selectedDevice = '';
  }

  public removeDevice(deviceId) {
    const list = this.location.deviceId;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === deviceId) {
        return list.splice(i, 1);
      }
    }
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return this.loginService.setFormFieldErrors(form);
    }
    this.isLoading = true;
    this.pushLocation();
  }

  private pushLocation() {
    this.apiService
      .postNewLocation(this.location)
      .subscribe(response => {
        this.apiService.getLocationList(true).subscribe(this.onSuccess());
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  private onSuccess() {
    this.location = undefined;
    this.checkLocation();
    this.router.navigate(['/']);
  }

}
