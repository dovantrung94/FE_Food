import { ShareModule } from './../../share.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { AuthGuard } from './../../guard/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from "@angular/router";
import { DetailProductComponent } from './detail-product/detail-product.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail-product', component: DetailProductComponent}

];


@NgModule({
  declarations: [HomeComponent, DetailProductComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
