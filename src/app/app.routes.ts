import { Routes } from '@angular/router';

export const appRoutes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {   
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },

    { 
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },

    { 
        path: 'tecnico',
        loadChildren: () => import('./pages/tecnico/tecnico.routes').then(m => m.TECNICO_ROUTES)
    },

    { 
        path: 'consultor',
        loadChildren: () => import('./pages/consultor/consultor.routes').then(m => m.CONSULTOR_ROUTES)
    },

    { 
        path: 'vendedor',
        loadChildren: () => import('./pages/vendedor/vendedor.routes').then(m => m.VENDEDOR_ROUTES)
    },

    { 
        path: '**',
        loadComponent: () => import('./pages/error404/error404').then(m => m.Error404)
    }

];
