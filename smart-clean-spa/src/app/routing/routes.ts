import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


export const AppRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: 'src/app/features/auth-views/auth-views.module#AuthViewsModule'
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: 'src/app/features/dashboard-views/dashboard-views.module#DashboardViewsModule'
    }
];
