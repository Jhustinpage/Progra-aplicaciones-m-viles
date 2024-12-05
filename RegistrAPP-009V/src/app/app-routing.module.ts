import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from './services/db.service';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
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
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule), canActivate: [AuthGuard]
  },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)  },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule) , canActivate: [AuthGuard]
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'leer-qr',
    loadChildren: () => import('./pages/leer-qr/leer-qr.module').then( m => m.LeerQrPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule),
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
