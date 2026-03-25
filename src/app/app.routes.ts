import { Routes } from '@angular/router';
import { UserDetailComponent } from './pages/users/components/user-details/user-details.component';
import { UserListComponent } from './pages/users/components/user-list/user-list.component';
import { HeaderComponent } from './layout/header/header.component';


export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users/components/user-list/user-list.component')
            .then(m => m.UserListComponent)
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./pages/users/components/user-details/user-details.component')
            .then(m => m.UserDetailComponent)
      },
       {
        path: '**',
        redirectTo: ''  
      }
    ]
  }
];

