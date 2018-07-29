import { LoginViewComponent } from './../login-view/login-view.component';
import { Routes } from '@angular/router';
import { UnauthLayoutComponent } from '../../../layouts/unauth-layout/unauth-layout.component';

export const AuthRoutes: Routes = [
    {path: '', component: UnauthLayoutComponent, children: [
        {path: 'login', component: LoginViewComponent, pathMatch: 'full'},
    ]}
];
