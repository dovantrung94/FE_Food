import { OrderComponent } from './order/order.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './../../guard/auth.guard';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';

import { Routes, RouterModule, Router } from "@angular/router";

import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate : [AuthGuard],
        children: [
            {
                path: '',
                component: ProductComponent
            },
            {
                path:'category',
                component: CategoryComponent
            }, 
            {
                path:'user',
                component: UserComponent
            }, 
            {
                path:'product/create',
                component: ProductComponent
            }, 
            {
                path:'order',
                component: OrderComponent
            }
            , 
            {
                path:'product/list',
                component: ProductListComponent
            },
            {
                path:'logout',
                component: LogoutComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 
export class  AdminRoutingModule{}  