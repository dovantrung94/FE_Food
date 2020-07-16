import { CategoryComponent } from './category/category.component';
import { ShareModule } from './../../share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminRoutingModule } from './admin.module.routing';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'product', component: ProductComponent}
];
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { UserComponent } from './user/user.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [AdminComponent, ProductComponent, UserComponent,CategoryComponent],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    AdminRoutingModule,
    RouterModule
  ]
})
export class AdminModule { }

