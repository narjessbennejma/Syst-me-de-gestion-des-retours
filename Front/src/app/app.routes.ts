import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from '../app/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./views/pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard], 
        data: { title: 'Profil utilisateur' }
      },
      {
        path: 'produits',
        loadComponent: () => import('./components/produit-list/produit-list.component').then(m => m.ProduitListComponent),
        canActivate: [AuthGuard], 
        data: { title: 'List produits' }
      },
      {
        path: 'mescommandes',
        loadComponent: () => import('./components/mes-commandes/mes-commandes.component').then(m => m.MesCommandesComponent),
        canActivate: [AuthGuard], 
        data: { title: 'Mes commandes' }
      },
      {
        path: 'listretours',
        loadComponent: () => import('./components/list-retours/list-retours.component').then(m => m.ListRetoursComponent),
        canActivate: [AuthGuard], 
        data: { title: 'List Retours' }
      },
      {
        path: 'retoursclient',
        loadComponent: () => import('./components/retours-client/retours-client.component').then(m => m.RetoursClientComponent),
        canActivate: [AuthGuard], 
        data: { title: 'Mes Retours ' }
      },
      {
        path: 'historiqueretours',
        loadComponent: () => import('./components/historique-retour/historique-retour.component').then(m => m.HistoriqueRetourComponent),
        canActivate: [AuthGuard], 
        data: { title: 'Historique Retour' }
      },
      {
        path: 'logout',
        loadComponent: () => import('./components/logout/logout.component').then(m => m.LogoutComponent),
        canActivate: [AuthGuard], 
        data: { title: 'logoutils' }
      },
      {
        path:'nonconformites',
        loadComponent: () => import('./components/non-conformite-list/non-conformite-list.component').then(m => m.NonConformiteListComponent),
        canActivate: [AuthGuard],
        data: { title: 'Non Conformites' }
      },
      {
        path: 'userslist',
        loadComponent: () => import('./components/users-list/users-list.component').then(m => m.UsersListComponent),
        canActivate: [AuthGuard],
        data: { title: 'Users List' }
      },
      
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
