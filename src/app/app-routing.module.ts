import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './shared/guard/route.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  // {
  //   path: 'demo',
  //   canActivate: [RouteGuard],
  //   canActivateChild: [RouteGuard],
  //   loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  // },

  {
    path: 'auth',
    loadChildren: () =>
      import('././auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/pages',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
