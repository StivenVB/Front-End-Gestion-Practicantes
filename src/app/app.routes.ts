import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'security',
        loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'practice-offer-admin',
        loadChildren: () => import('./modules/practice-offer-admin/practice-offer-admin.module').then(m => m.PracticeOfferAdminModule)
    },
    {
        path: 'virtual-library',
        loadChildren: () => import('./modules/virtual-library/virtual-library.module').then(m => m.VirtualLibraryModule)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
