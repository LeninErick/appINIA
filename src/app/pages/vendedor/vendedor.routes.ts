import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { roleGuard } from '../../guards/role-guard';
import { Vendedor } from './vendedor';

export const VENDEDOR_ROUTES: Routes = [

    {
        
        path: '',
        component: Vendedor,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Vendedor'] },

    }

];