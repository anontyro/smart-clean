import { Component, OnInit, Input } from '@angular/core';
import { DeviceModel } from '../../../../../models/database/device.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  @Input()
  public deviceList: Array<DeviceModel> = [];

  constructor() { }

  ngOnInit() {
  }

}
