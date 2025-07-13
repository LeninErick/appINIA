import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { roleGuard } from '../../guards/role-guard';
import { Tecnico } from './tecnico';


export const TECNICO_ROUTES: Routes = [

    {
        path: '',
        component: Tecnico,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Técnico'] }
    }
    
];
