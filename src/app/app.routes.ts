import { Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { TecnicoComponent } from './pages/tecnico/tecnico.component';
import { ConsultorComponent } from './pages/consultor/consultor.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const appRoutes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard, roleGuard(['admin'])],
    },

    {
        path: 'tecnico',
        component: TecnicoComponent,
        canActivate: [authGuard, roleGuard(['tecnico'])],
        },
    {
        path: 'consultor',
        component: ConsultorComponent,
        canActivate: [authGuard, roleGuard(['consultor'])],
    },

    {
        path: 'vendedor',
        component: VendedorComponent,
        canActivate: [authGuard, roleGuard(['vendedor'])],
    },

    { path: '**', component: Error404Component }

];
