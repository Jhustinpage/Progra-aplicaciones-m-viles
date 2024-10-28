import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from './services/db.service';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule), canActivate: [ DbService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule), canActivate: [ DbService]
  },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) , canActivate: [ DbService] },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) , canActivate: [ DbService]},
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule) , canActivate: [ DbService]
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule), canActivate: [ DbService]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule) , canActivate: [ DbService]
  },
  {
    path: 'leer-qr',
    loadChildren: () => import('./pages/leer-qr/leer-qr.module').then( m => m.LeerQrPageModule) , canActivate: [ DbService]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
