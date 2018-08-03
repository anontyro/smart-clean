import { NgForm } from '@angular/forms';
import { ApiHandlerService } from './../../../../core/services/api/api-handler.service';
import { LoginHandlerService } from './../../../../core/services/auth/login-handler.service';
import { Component, OnInit, Input } from '@angular/core';
import { DeviceModel } from '../../../../../models/database/device.model';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {

  @Input()
  public device: DeviceModel;

  public isLoading = false;

  constructor(
    private loginService: LoginHandlerService,
    private apiService: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.deviceExists();
  }

  private deviceExists() {
    if (this.device) {
      return;
    }
    const dev: DeviceModel = {
      id: '',
      deviceType: '',
      locationId: '',
      display_name: '',
    };
    this.device = dev;
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return this.loginService.setFormFieldErrors(form);
    }
    this.isLoading = true;
    if (this.device._id) {
      this.updateDevice();
    } else {
      this.createDevice();
    }
  }

  public detach() {
    this.apiService.detachDevice(this.device)
      .subscribe(response => {
        console.log(response);
        this.onSuccess();
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  private updateDevice() {
    this.apiService.putDeviceUpdate(this.device)
      .subscribe(response => {
        this.apiService.getDeviceList(true).subscribe(this.onSuccess());
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  private createDevice() {
    this.apiService.postNewDeviceList(this.device)
      .subscribe(response => {
        console.log(response);
        this.apiService.getDeviceList(true).subscribe(this.onSuccess());
      }, err => {
        this.isLoading = false;
        console.error(err);
      });
  }

  private onSuccess() {
    this.device = undefined;
    this.router.navigate(['/']);
  }

}
