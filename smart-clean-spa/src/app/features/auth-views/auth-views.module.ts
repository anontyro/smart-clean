import { LayoutsModule } from './../../layouts/layouts.module';
import { AuthRoutes } from './routing/auth.routes';
import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '../../../../node_modules/@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LayoutsModule,
    RouterModule.forChild(AuthRoutes),
    MatFormFieldModule
  ],
  declarations: [LoginViewComponent],
  exports: [
    LoginViewComponent
  ]
})
export class AuthViewsModule { }
