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
    ProjectDetailsComponent],
  exports: [
    DashboardLandingComponent,
    ProjectListComponent,
    ProjectItemComponent,
    LocationListComponent,
    DeviceListComponent
  ]
})
export class DashboardViewsModule { }
