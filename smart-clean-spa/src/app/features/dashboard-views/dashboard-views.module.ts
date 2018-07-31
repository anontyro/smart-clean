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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LayoutsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardLandingComponent, ProjectListComponent, ProjectItemComponent, LocationListComponent, DeviceListComponent],
  exports: [
    DashboardLandingComponent
  ]
})
export class DashboardViewsModule { }
