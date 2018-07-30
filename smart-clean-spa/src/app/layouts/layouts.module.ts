import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { UnauthLayoutComponent } from './unauth-layout/unauth-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [BaseLayoutComponent, UnauthLayoutComponent]
})
export class LayoutsModule { }
