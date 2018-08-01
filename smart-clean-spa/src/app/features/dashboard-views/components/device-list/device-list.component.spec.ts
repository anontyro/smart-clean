import { MockDevice1, MockDevice2 } from './../../../../../testing/mocks/device.mocks';
import { DeviceItemComponent } from './components/device-item/device-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListComponent, DeviceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    component.deviceList = [MockDevice1, MockDevice2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
