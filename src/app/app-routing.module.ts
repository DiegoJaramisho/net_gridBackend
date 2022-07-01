import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/list/list.module').then(m => m.ListModule)
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/new/new.module').then(m => m.NewModule)
  },
  {
    path: 'details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/details/details.module').then(m => m.DetailsModule)
  },
  {
    path: 'edit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/edit/edit.module').then(m => m.EditModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: '/list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
