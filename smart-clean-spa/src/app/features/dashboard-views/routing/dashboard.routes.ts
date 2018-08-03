import { CreateDeviceComponent } from './../create-device/create-device.component';
import { CreateLocationComponent } from './../create-location/create-location.component';
import { ProjectDetailsComponent } from './../project-details/project-details.component';
import { DashboardLandingComponent } from './../dashboard-landing/dashboard-landing.component';
import { BaseLayoutComponent } from './../../../layouts/base-layout/base-layout.component';
import { Routes } from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';

export const DashboardRoutes: Routes = [
    {path: '', component: BaseLayoutComponent, children: [
        {path: '', component: DashboardLandingComponent, pathMatch: 'full'},
        {path: 'project/create', component: CreateProjectComponent, pathMatch: 'full'},
        {path: 'location/create', component: CreateLocationComponent, pathMatch: 'full'},
        {path: 'device/create', component: CreateDeviceComponent, pathMatch: 'full'},
        {path: 'project/:id', component: ProjectDetailsComponent, pathMatch: 'full'},

    ]}
];
