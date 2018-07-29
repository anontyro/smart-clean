import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { UnauthLayoutComponent } from './unauth-layout/unauth-layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseLayoutComponent, UnauthLayoutComponent]
})
export class LayoutsModule { }
