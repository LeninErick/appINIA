import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { roleGuard } from '../../guards/role-guard';
import { Consultor } from './consultor';

export const CONSULTOR_ROUTES: Routes = [

    {
        path: '',
        component: Consultor,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Consultor'] }
    }
    
];
