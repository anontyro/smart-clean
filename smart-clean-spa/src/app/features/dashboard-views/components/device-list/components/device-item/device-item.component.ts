import { Component, OnInit, Input } from '@angular/core';
import { DeviceModel } from '../../../../../../../models/database/device.model';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss']
})
export class DeviceItemComponent implements OnInit {

  @Input()
  public device: DeviceModel;

  constructor() { }

  ngOnInit() {
  }

}
