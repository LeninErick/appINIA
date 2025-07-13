import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { roleGuard } from '../../guards/role-guard';
import { Admin } from './admin';

export const ADMIN_ROUTES: Routes = [

    {
        
        path: '',
        component: Admin,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin'] },

    }

];
