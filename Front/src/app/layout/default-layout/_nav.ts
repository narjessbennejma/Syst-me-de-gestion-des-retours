import { INavData } from '@coreui/angular';
import { INavDataWithRoles } from './nav-data-with-roles';

export const navItems: INavDataWithRoles[] = [
  {
    name: 'Produits',
    url: '/produits',
    icon: 'fas fa-boxes',
    roles: ['ADMIN', 'EMPLOYE', 'USER']
  },
  {
    name: 'Mes Commandes',
    url: '/mescommandes',
    icon: 'fas fa-shopping-cart',
    roles: ['USER']
  },
  {
    name: 'Mes Retours',
    url: '/retoursclient',
    icon: 'fas fa-undo',
    roles: ['USER']
  },
  {
    name: 'Tous les Retours',
    url: '/listretours',
    icon: 'fas fa-exchange-alt',
    roles: ['ADMIN', 'EMPLOYE']
  },
  {
    name: 'Historique Retours',
    url: '/historiqueretours',
    icon: 'fas fa-history',
    roles: ['ADMIN']
  },
  {
    name: 'Non-Conformités',
    url: '/nonconformites',
    icon: 'fas fa-exclamation-triangle',
    roles: ['ADMIN', 'EMPLOYE']
  },
  {
  name: 'Utilisateurs',
  url: '/userslist',
  icon: 'fas fa-users',
  roles: ['ADMIN', 'EMPLOYE']
},
  {
    name: 'Profil',
    url: '/profile',
    icon: 'fas fa-user',
    roles: ['ADMIN', 'EMPLOYE', 'USER']
  },
  {
    title: true,
    name: 'Authentification'
  },
  {
    name: 'Déconnexion',
    url: '/logout',
    icon: 'fas fa-sign-out-alt',
    roles: ['ADMIN', 'EMPLOYE', 'USER']
  },

  
];
