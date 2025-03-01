import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/home/home.component').then((c) => c.HomeComponent),
  },
];
