import { LayoutsModule } from './../../layouts/layouts.module';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { DashboardRoutes } from './routing/dashboard.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLandingComponent } from './dashboard-landing/dashboard-landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LayoutsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardLandingComponent],
  exports: [
    DashboardLandingComponent
  ]
})
export class DashboardViewsModule { }
