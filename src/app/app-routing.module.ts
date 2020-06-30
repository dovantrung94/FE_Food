import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomeModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
