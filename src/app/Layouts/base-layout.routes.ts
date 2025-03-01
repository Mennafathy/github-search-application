import { Routes } from '@angular/router';
import { BaseIndexComponent } from './base-index/base-index.component';

export const BASE_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: BaseIndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../Modules/Home/home.routes').then((r) => r.HOME_ROUTES),
      },
      {
        path: 'user/:username',
        loadComponent: () =>
          import('../Modules/Details/userdetails/userdetails.component').then(
            (c) => c.UserdetailsComponent
          ),
      },
    ],
  },
];
