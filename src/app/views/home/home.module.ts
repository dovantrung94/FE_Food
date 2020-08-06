import { ShareModule } from './../../share.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { AuthGuard } from './../../guard/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from "@angular/router";
import { DetailProductComponent } from './detail-product/detail-product.component';
import { PayComponent } from './pay/pay.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail-product/:id', component: DetailProductComponent},
  { path: 'pay', component: PayComponent,canActivate:[AuthGuard]},
  { path: 'confirm', component: ConfirmComponent,canActivate:[AuthGuard]},
  { path:'home-detail',component:HomeDetailComponent},
  {path:'user-info',component:UpdateUserInfoComponent}
];


@NgModule({
  declarations: [HomeComponent, DetailProductComponent, PayComponent, ConfirmComponent, HomeDetailComponent, UpdateUserInfoComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
