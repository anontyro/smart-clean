import { LayoutsModule } from './../../layouts/layouts.module';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { DashboardRoutes } from './routing/dashboard.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLandingComponent } from './dashboard-landing/dashboard-landing.component';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectItemComponent } from './components/project-list/component/project-item/project-item.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceItemComponent } from './components/device-list/components/device-item/device-item.component';
import { LocationItemComponent } from './components/location-list/components/location-item/location-item.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { CreateLocationComponent } from './create-location/create-location.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LayoutsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardLandingComponent,
    ProjectListComponent,
    ProjectItemComponent,
    LocationListComponent,
    DeviceListComponent,
    DeviceItemComponent,
    LocationItemComponent,
    ProjectDetailsComponent,
    DeviceFormComponent,
    LocationFormComponent,
    ProjectFormComponent,
    CreateProjectComponent,
    CreateDeviceComponent,
    CreateLocationComponent],
  exports: [
    DashboardLandingComponent,
    ProjectListComponent,
    ProjectItemComponent,
    LocationListComponent,
    DeviceListComponent
  ]
})
export class DashboardViewsModule { }
