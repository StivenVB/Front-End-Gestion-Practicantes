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
        path: 'practice-offer',
        loadChildren: () => import('./modules/practice-offers/practice-offers.module').then(m => m.PracticeOffersModule)
    },
    {
        path: 'practice-postulation',
        loadChildren: () => import('./modules/practice-postulation/practice-postulation.module').then(m => m.PracticePostulationModule)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
