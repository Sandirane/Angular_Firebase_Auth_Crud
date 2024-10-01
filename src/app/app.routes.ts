import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        canActivateChild: [publicGuard()],
        path: 'auth',
        loadChildren: () => import('./pages/auth/features/auth.routes')
    },
    {
        canActivateChild: [privateGuard()],
        path: 'tasks',
        loadComponent: () => import('./shared/ui/layout.component'),
        loadChildren: () => import('./pages/task/features/task.routes')
    },
    {
        path: '**',
        redirectTo: '/tasks'
    }
];
