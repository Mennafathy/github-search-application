import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Layouts/base-layout.routes').then((r) => r.BASE_LAYOUT_ROUTES),
  },
];
