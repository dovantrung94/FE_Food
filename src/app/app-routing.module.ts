import { ForgetComponent } from './views/user/forget-password/forget.component';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent,canActivate:[LoginGuard] },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then( m => m.AdminModule)
  },
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgetComponent },
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
