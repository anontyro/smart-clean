import { LocationItemComponent } from './../components/location-list/components/location-item/location-item.component';
import { LocationListComponent } from './../components/location-list/location-list.component';
import { ProjectListComponent } from './../components/project-list/project-list.component';
import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLandingComponent } from './dashboard-landing.component';
import { DeviceListComponent } from '../components/device-list/device-list.component';
import { ProjectItemComponent } from '../components/project-list/component/project-item/project-item.component';
import { DeviceItemComponent } from '../components/device-list/components/device-item/device-item.component';
import { HttpClientTestingModule } from '../../../../../node_modules/@angular/common/http/testing';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';

describe('DashboardLandingComponent', () => {
  let component: DashboardLandingComponent;
  let fixture: ComponentFixture<DashboardLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardLandingComponent,
        ProjectListComponent,
        LocationListComponent,
        DeviceListComponent,
        ProjectItemComponent,
        LocationItemComponent,
        DeviceItemComponent
      ],
      providers: [
        ApiHandlerService,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
