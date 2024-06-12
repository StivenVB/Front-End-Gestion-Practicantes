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
        path: 'upload-files',
        loadChildren: () => import('./modules/upload-files/upload-files.module').then(m => m.UploadFilesModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'practice-offer-admin',
        loadChildren: () => import('./modules/practice-offer-admin/practice-offer-admin.module').then(m => m.PracticeOfferAdminModule)
    },
    {
        path: 'users-admin',
        loadChildren: () => import('./modules/users-admin/users-admin.module').then(m => m.UsersAdminModule)
    },
    {
        path: 'virtual-library',
        loadChildren: () => import('./modules/virtual-library/virtual-library.module').then(m => m.VirtualLibraryModule)
    },
    {
        path: 'admitted',
        loadChildren: () => import('./modules/admitted/admitted.module').then(m => m.AdmittedModule)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
