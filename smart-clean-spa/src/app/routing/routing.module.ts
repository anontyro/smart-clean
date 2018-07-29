import { AppRoutes } from './routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
