import { DashboardLandingComponent } from './../dashboard-landing/dashboard-landing.component';
import { BaseLayoutComponent } from './../../../layouts/base-layout/base-layout.component';
import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
    {path: '', component: BaseLayoutComponent, children: [
        {path: '', component: DashboardLandingComponent, pathMatch: 'full'},
    ]}
];